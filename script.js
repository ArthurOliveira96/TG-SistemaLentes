'use strict';


function multiple_lenses_formula(so, n, R, na, da, dab){

    // Variaveis nao declaradas
    let nright = [];
    let nleft = [];
    let gen11 = [];
    let gen12 = [];
    let gen21 = [];
    let gen22 = [];
    let M11 = [];
    let M12 = [];
    let M21 = [];
    let M22 = [];
    let f;
    let zf;
    let zb;
    let h1;
    let h2;
    let soprime;
    let siprime;
    let si;

    if (dab.length===1 && dab[0]===0){
        
        nright[0] = na[1];
        nleft[1] = na[0];
        nleft[0] = n[0];
        nright[1] = n[2];

        for (let j=0; j<R.length/2; j++){
            gen11[j] = 1+(na[j]-nright[j])*da[j]/(na[j]*R[2*j+1]);
            gen12[j] = -(na[j]-nleft[j])/R[2*j]+(na[j]-nright[j])/R[2*j+1]-(da[j]/na[j])*((na[j]-nleft[j])/R[2*j])*((na[j]-nright[j])/R[2*j+1]);
            gen21[j] = da[j]/na[j];
            gen22[j] = 1-(na[j]-nleft[j])*da[j]/(na[j]*R[2*j]);
        }

        M11[0] = gen11[1]*gen11[0]+gen12[1]*((dab[0]/n[1])*gen11[0]+gen21[0]);
        M12[0] = gen11[1]*gen12[0]+gen12[1]*((dab[0]/n[1])*gen12[0]+gen22[0]);
        M21[0] = gen21[1]*gen11[0]+gen22[1]*((dab[0]/n[1])*gen11[0]+gen21[0]);
        M22[0] = gen21[1]*gen12[0]+gen22[1]*((dab[0]/n[1])*gen12[0]+gen22[0]);

        f = -1/M12[0];  // focal distance
        zf = n[0]*f*M11[0];  // front focal distance
        zb = n[n.length-1]*f*M22[0];  // back focal distance
        h1 = n[0]*f*(1-M11[0]);  // 1 PP distance
        h2 = n[n.length-1]*f*(M22[0]-1);  // 2 PP distance
        soprime = so+h1; // so'
        siprime = (n[2]*(-1/M12[0])*soprime)*(1/(soprime-n[0]*(-1/M12[0])));  // si'
        si = siprime + h2;

    } else if (dab.length===1 && dab[0]>0){
        
        nright[0] = n[1];
        nleft[1] = n[1];
        nleft[0] = n[0];
        nright[1] = n[2];

        for (let j=0; j<R.length/2; j++){
            gen11[j] = 1+(na[j]-nright[j])*da[j]/(na[j]*R[2*j+1]);
            gen12[j] = -(na[j]-nleft[j])/R[2*j]+(na[j]-nright[j])/R[2*j+1]-(da[j]/na[j])*((na[j]-nleft[j])/R[2*j])*((na[j]-nright[j])/R[2*j+1]);
            gen21[j] = da[j]/na[j];
            gen22[j] = 1-(na[j]-nleft[j])*da[j]/(na[j]*R[2*j]);
        };

        M11[0] = gen11[1]*gen11[0]+gen12[1]*((dab[0]/n[1])*gen11[0]+gen21[0]);
        M12[0] = gen11[1]*gen12[0]+gen12[1]*((dab[0]/n[1])*gen12[0]+gen22[0]);
        M21[0] = gen21[1]*gen11[0]+gen22[1]*((dab[0]/n[1])*gen11[0]+gen21[0]);
        M22[0] = gen21[1]*gen12[0]+gen22[1]*((dab[0]/n[1])*gen12[0]+gen22[0]);

        f = -1/M12[0];  // focal distance
        zf = n[0]*f*M11[0];  // front focal distance
        zb = n[n.length-1]*f*M22[0];  // back focal distance
        h1 = n[0]*f*(1-M11[0]);  // 1 PP distance
        h2 = n[n.length-1]*f*(M22[0]-1);  // 2 PP distance
        soprime = so+h1; // so'
        siprime = (n[2]*(-1/M12[0])*soprime)*(1/(soprime-n[0]*(-1/M12[0])));  // si'
        si = siprime + h2;

    } else if (dab.length>=2) {
        
        for (let i=0; i<dab.length+1; i++){
            nright[i] = n[i+1];
        };

        for (let i=0; i<dab.length; i++){
            if (dab[i]==0){
                nright[i] = na[i+1];
            }
        };

        for (let i=0; i<dab.length+1; i++){
            nleft[i] = n[i];
        };

        for (var i=0; i<dab.length; i++){
            
            if (dab[i]==0){
                nleft[i+1] = na[i];
            };

            for (let j=0; j<R.length/2; j++){
                gen11[j] = 1+(na[j]-nright[j])*da[j]/(na[j]*R[2*j+1]);
                gen12[j] = -(na[j]-nleft[j])/R[2*j]+(na[j]-nright[j])/R[2*j+1]-(da[j]/na[j])*((na[j]-nleft[j])/R[2*j])*((na[j]-nright[j])/R[2*j+1]);
                gen21[j] = da[j]/na[j];
                gen22[j] = 1-(na[j]-nleft[j])*da[j]/(na[j]*R[2*j]);
            };
        
            M11[0] = gen11[1]*gen11[0]+gen12[1]*((dab[0]/n[1])*gen11[0]+gen21[0]);
            M12[0] = gen11[1]*gen12[0]+gen12[1]*((dab[0]/n[1])*gen12[0]+gen22[0]);
            M21[0] = gen21[1]*gen11[0]+gen22[1]*((dab[0]/n[1])*gen11[0]+gen21[0]);
            M22[0] = gen21[1]*gen12[0]+gen22[1]*((dab[0]/n[1])*gen12[0]+gen22[0]);

            for (var k=1; k<dab.length; k++){
                M11[k] = gen11[k+1]*M11[k-1]+gen12[k+1]*((dab[k]/n[k+1])*M11[k-1]+M21[k-1]);
                M12[k] = gen11[k+1]*M12[k-1]+gen12[k+1]*((dab[k]/n[k+1])*M12[k-1]+M22[k-1]);
                M21[k] = gen21[k+1]*M11[k-1]+gen22[k+1]*((dab[k]/n[k+1])*M11[k-1]+M21[k-1]);
                M22[k] = gen21[k+1]*M12[k-1]+gen22[k+1]*((dab[k]/n[k+1])*M12[k-1]+M22[k-1]);
            };
        };

        f = -1/M12[k-1];  // focal distance
        zf = n[0]*f*M11[k-1];  // front focal distance
        zb = n[n.length-1]*f*M22[k-1];  // back focal distance
        h1 = n[0]*f*(1-M11[k-1]);  // 1 PP distance
        h2 = n[n.length-1]*f*(M22[k-1]-1);  // 2 PP distance
        soprime = so+h1; // so'
        siprime = (n[i-1]*(-1/M12[k-1])*soprime)*(1/(soprime-n[0]*(-1/M12[k-1])));  // si'
        si = siprime + h2;
    };

    return [M11,M12,M21,M22,f,zb,zf,h1,h2,si];
};


window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
};


const addLineThrough = () => {
    const inputBoxes = document.querySelectorAll(".input-box");
    const lastInputBox = inputBoxes[inputBoxes.length-1];
    
    inputBoxes.forEach((element) => {
        element.classList.remove("line--through");
        element.querySelector("input").required = true;
    })

    if (lastInputBox.querySelector("label").innerHTML === "D:"){
        lastInputBox.classList.add("line--through");
        lastInputBox.querySelector("input").required = false;
    }
};


document.getElementById("add-elemento").onclick = () => {
    const form_middle = document.getElementsByClassName("middle")[0];
    const items = document.getElementsByClassName("input-element").length;
    let id_new_element;

    if (items % 2 === 1) {
        // Se impar, adicionar elemento par (MEIO)
        form_middle.insertAdjacentHTML("beforeend", `
            <div class="input-element">
                    <h2>Meio ${(items+1)/2} 🧊</h2>
                    <div class="input-boxes">
                        <div class="input-box">
                            <label for="iref${items+1}">N:</label>
                            <input type="number" name="ref${items+1}" id="iref${items+1}" placeholder="Ind. refração" step="0.0000000001" min="1" required>
                        </div>
                        <div class="input-box">
                            <label for="idist${items+1}">D:</label>
                            <input type="number" name="dist${items+1}" id="idist${items+1}" placeholder="Distância" step="0.0000000001" min="0" required>
                        </div>
                    </div>
                </div>
        `);
        id_new_element = `iref${items+1}`;
    } else {
        // Se par, adicionar elemento impar (LENTE)
        form_middle.insertAdjacentHTML("beforeend", `
            <div class="input-element">
                    <h2>Lente ${items/2} 🔍</h2>
                    <div class="input-boxes">
                        <div class="input-box">
                            <label for="iref${items+1}">N:</label>
                            <input type="number" name="ref${items+1}" id="iref${items+1}" placeholder="Ind. refração" step="0.0000000001" min="1" required>
                        </div>
                        <div class="input-box">
                            <label for="ilar${items+1}">L:</label>
                            <input type="number" name="lar${items+1}" id="ilar${items+1}" placeholder="Largura" step="0.0000000001" min="0" required>
                        </div>
                        <div class="input-box">
                            <label for="ire${items+1}">R<sub>e</sub>:</label>
                            <input type="number" name="re${items+1}" id="ire${items+1}" placeholder="Raio esquerdo" step="0.0000000001" required>
                        </div>
                        <div class="input-box">
                            <label for="ird${items+1}">R<sub>d</sub>:</label>
                            <input type="number" name="rd${items+1}" id="ird${items+1}" placeholder="Raio direito" step="0.0000000001" required>
                        </div>
                    </div>
                </div>
        `);
        id_new_element = `ird${items+1}`;
    };

    addLineThrough()
    window.smoothScroll(document.getElementById(id_new_element));
};


document.getElementById("remover-elemento").onclick = () => {
    const items = document.getElementsByClassName("input-element");
    if (items.length > 6) {
        const to_remove = items[items.length-1];
        to_remove.remove();
    };
    addLineThrough()
};


document.getElementById("calcular").onclick = () => {
    const form_middle = document.getElementsByClassName("middle")[0];
    const param_items = form_middle.getElementsByClassName("input-element");

    // Se nao ha itens adicionados, cancela a operacao
    if (param_items.length < 6) {
        alert("Insira pelo menos 3 MEIOS.");
        return;
    }

    // Se o ultimo item nao eh MEIO, cancela a operacao
    if (param_items.length % 2 === 1) {
        alert("O último item do sistema deve ser um MEIO.");
        return
    }

    // Se ha campos vazios, cancela a operacao
    const inputs = form_middle.getElementsByTagName("input");
    const values = Array.prototype.map.call(inputs, e => e.required ? e.value : "placeholder");
    if (values.includes("")) {
        return;
    }

    // Se ha campos o suficiente e todos estao preenchidos, seguimos com o calculo
    let n = []; 
    let R = []; 
    let na = []; 
    let da = []; 
    let dab = [];

    for (let i=0; i<param_items.length; i++) { 
        if (i===0) {
            continue;
        } else if (i%2===1) {
            // Se impar, estamos no MEIO
            dab.push(Number(document.getElementById(`idist${i+1}`).value));
            n.push(Number(document.getElementById(`iref${i+1}`).value));
        } else {
            // Se par, estamos na LENTE
            da.push(Number(document.getElementById(`ilar${i+1}`).value));
            na.push(Number(document.getElementById(`iref${i+1}`).value));
            R.push(Number(document.getElementById(`ire${i+1}`).value));
            R.push(Number(document.getElementById(`ird${i+1}`).value));
        }
    }

    let solution = multiple_lenses_formula(dab[0], n, R, na, da, dab.slice(1, -1));

    let M11 = solution[0];
    let M12 = solution[1];
    let M21 = solution[2];
    let M22 = solution[3];
    let f = solution[4];
    let zb = solution[5];
    let zf = solution[6];
    let h1 = solution[7];
    let h2 = solution[8];
    let si = solution[9];

    window.document.getElementById("im11").innerHTML = M11.map(e => e.toFixed(2)).join(", ");
    window.document.getElementById("im12").innerHTML = M12.map(e => e.toFixed(2)).join(", ");
    window.document.getElementById("im21").innerHTML = M21.map(e => e.toFixed(2)).join(", ");
    window.document.getElementById("im22").innerHTML = M22.map(e => e.toFixed(2)).join(", ");
    window.document.getElementById("if").innerHTML = f.toFixed(2);
    window.document.getElementById("ih1").innerHTML = h1.toFixed(2);
    window.document.getElementById("ih2").innerHTML = h2.toFixed(2);
    window.document.getElementById("izb").innerHTML = zb.toFixed(2);
    window.document.getElementById("izf").innerHTML = zf.toFixed(2);
    window.document.getElementById("isi").innerHTML = si.toFixed(2);
    
}