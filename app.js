const {writeFileSync} = require('fs');
const autos = require('./autos.json');
const personas = require('./personas.json');
function guardarCambios (autos){
    writeFileSync('./autos.json',JSON.stringify(autos,null,3,'utf-8'))
}
const concesionaria = {
    autos,
    buscarAuto : function(patente){
        return this.autos.find(auto => auto.patente === patente) || null
   
    },
    venderAuto : function(patente){
        
        const autosModificados = this.autos.map(auto => {
            if(auto.patente ===patente){
                auto.vendido = true
            }

            return auto
        })
        guardarCambios(autosModificados);

        return autosModificados.find(auto => auto.patente ===patente)
    },
    autosParaLaVenta : function(){
        return this.autos.filter(auto => auto.vendido === false)
    },
    autosNuevos : function(){
        return this.autosParaLaVenta().filter(auto => auto.km <100)
    },
    listaDeVentas : function(){
        return this.autos.filter(auto => auto.vendido).map(auto => auto.precio)
    },
    totalDeVentas : function(){
        return this.listaDeVentas().reduce((acum,num) => acum + num,0)
    },
    puedeComprar : function(auto,persona){
        return auto.precio <= persona.capacidadDePagoTotal && (auto.precio / auto.cuotas) <= persona.capacidadDePagoEnCuotas
    },
    autosQuePuedeComprar : function(persona){
        let autosEnVenta = this.autosParaLaVenta();
        return autosEnVenta.filter(auto => this.puedeComprar(auto,persona))

}
}
console.log(concesionaria.autosQuePuedeComprar(personas[2]));