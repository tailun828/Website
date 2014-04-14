
var dataRetrieve = function(smilesString) {
    $.ajax({ 
    dataType: 'text',
    async:false,
    url: "http://cactus.nci.nih.gov/chemical/structure/"+smilesString +"/sdf", 
    context: document.body, 
    success: function(data){ 
        result = data;
        }
    });  
    return result;
};

var smilesParser = function(data) {

        var chemFormula = data.substring(0,data.indexOf('APtclcactv'));  // get chem formula by taking substring 0 to wherre APtclc starts
        data = data.split(" ");   // made array of the data
        data = data.filter(function(e){return e});  //got rid of empty cells in the array
        var numAtom = Number(data[5]);
        var numBond = Number(data[6]);
        var molObject = new Object();
        var bondPath = new Object();
        var counter = 0; //counter for xy coordinate (16 apart)
        var counter2 = 0; //counter for bond path (7 apart)
        var bondPathData = data.slice(16*(Number(numAtom)+1) , data.length)   //shrunk the data to only the bond path

        function newElement(atomNumber , xCoordinate, yCoordinate, elementType, stereochemistry) {
                this.atomNumber = atomNumber;
                this.xCoordinate = xCoordinate;
                this.yCoordinate = yCoordinate;
                this.elementType = elementType;
                this.sterochemistry = stereochemistry;
            };

        function newBond(origin, end, stereochemistry, originCoordinate, endCoordinate) {
            this.origin = origin;
            this.end = end;
            this.stereochemistry = stereochemistry;
            this.originCoordinate = originCoordinate;
            this.endCoordinate = endCoordinate;
        }


        for (var i = 1; i < numAtom + 1 ; i++) {
            molObject[i] = new newElement(i, Number(data[16 + counter]) , Number(data[17 + counter]), (data[19 + counter]), Number(data[22 + counter]));
            counter = counter + 16;
        };

        for (var i = 1; i < numBond + 1; i++) {
            bondPath[i] = new newBond(bondPathData[0+counter2], bondPathData[1+counter2], bondPathData[2 +counter2]);
            counter2 = counter2+7;
            /*document.write(bondPath[i].origin, bondPath[i].end, '\s')*/
        }

        for (var i = 1; i <numBond+1; i++) {
            bondPath[i].originCoordinate = [molObject[Number(bondPath[i].origin)].xCoordinate,molObject[Number(bondPath[i].origin)].yCoordinate];
            bondPath[i].endCoordinate = [molObject[Number(bondPath[i].end)].xCoordinate, molObject[Number(bondPath[i].end)].yCoordinate];
            /*document.write(bondPath[i].origin);*/
        };


    return smilesParserOutput = [chemFormula,numAtom,numBond,molObject,bondPath];
};