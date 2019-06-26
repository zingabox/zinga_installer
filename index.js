AFRAME.registerComponent('zinga_installer', {
    schema: {
  },
  init: function () {
    const elem=this.el
    let allAtts = Object.assign({}, elem.attributes)
    allAtts.length=Object.keys(allAtts).length
    for (var i = 0; i < allAtts.length; i++) {
        var attrib = allAtts[i];
      
        if(attrib.name.startsWith("zinga_") && attrib.name !== 'zinga_installer')// && currComps.indexOf(attrib.name) < 0)
        {
          var els = document.querySelectorAll('[' + attrib.name + ']')
          var vals=removeComponent(attrib.name,els)
          
         ////HERE YOU GET USERNAME, COMPONENT NAME, AND VERSION NAME
          const domain=attrib.value.split('domain:')[1].split(';')[0]
          var my_awesome_script = document.createElement('script');
          // my_awesome_script.setAttribute('src','https://cdn.jsdelivr.net/gh/jafetmorales/'+attrib.name+'@v0.1/index.js');
          my_awesome_script.setAttribute('src','https://cdn.jsdelivr.net/'+domain);
          // my_awesome_script.setAttribute('src','./'+attrib.name+'.js');
          document.head.appendChild(my_awesome_script);
          my_awesome_script.addEventListener('load', loadedCallback(attrib,els,vals));
          
          function loadedCallback(attrib,els,vals) {
            var componentName=attrib.name
            var inter=setInterval(checkIfComponentExists.bind(componentName,vals), 100);
            function checkIfComponentExists(){ 
              if(AFRAME.components[componentName] !== undefined)
                {
                  clearInterval(inter)
                  loadedComponentCallback(componentName,vals)
                }
            }
            
            function loadedComponentCallback(componentName,vals) {
              if(vals.length>=1)
              {
                  els.forEach(function(element, index) {
                    element.setAttribute(componentName, vals[index])
                  })
              }
              initComponent(componentName,els)
            }
          }
        }
    }
    
    
    
          function removeComponent(componentName,els) {
            ////FIND ELEMENTS WITH THAT COMPONENT AND STORE THIS INFO
            ////REMOVE ATTRIBUTES FROM EACH ELEMENT
            var vals=[]
            if (els != null) {
              els.forEach(function(element, index) {
                vals[index] = element.getAttribute(componentName)
                element.removeAttribute(componentName)
              })
              ////DELETE COMPONENT PART
              delete AFRAME.components[componentName]
              // AFRAME.components[componentName]=null
              ////INITIALIZE ATTRIBUTES PART
              // els.forEach(function(element, index) {
              //   element.setAttribute(componentName, vals[index])
              // })
            }
            else {
              delete AFRAME.components[componentName]
              // AFRAME.components[componentName]=null
            }
            return vals
          }
    
          function initComponent(componentName, els) {
            // console.log(els)
            if (els != null) {
              els.forEach(function(element, index) {
                element.setAttribute(componentName, element.getAttribute(componentName))
                element.components[componentName].init()
              })
            }
          }
      },
    });
