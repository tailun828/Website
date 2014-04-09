var calculate = function(input) {

	var input = input
	input = input.replace(/\s/g, '');       /*get rid of all spacing "s*/
	var numArray = input.split(/\D/gi);
	var letterArray = input.split(/[^a-z]/gi);
	var shortLetterArray = letterArray.filter(function(e){return e});
	var numOpenPara = 0;
	var numClosePara = 0;
	var positionOpen = [];
	var positionClose = [];

	var listofOperations = ['squarerootof','mutliply' ,'times','add', 'and','plus','divideover','minus','subtract','sineof','tangentof','cosineof','exp']; /*fix minussubtract wrong match*/
	var operation = [ 'Math.sqrt', '*','*', '+','+','+', '/', '-','-', 'Math.sin', 'Math.tan', 'Math.cos','Math.pow'];
	var scoreArray = [];
	for (var i = 0; i<shortLetterArray.length; i++) {    /*loop through all the unrefined operators*/
		var unrefineOperatorString = shortLetterArray[i];
		for (var j =0; j<listofOperations.length;j++) {    /*match each unrefine operator to key*/
			var score = 0;
			var refineOperatorString = listofOperations[j];
			for (var k=0; k<unrefineOperatorString.length; k++) {
				refineOperatorString2 = refineOperatorString.replace(unrefineOperatorString[k], "")            /*delete each of the input in the operation key*/
				/*document.write(refineOperatorString2 + '\n');*/
				if (refineOperatorString2.length === refineOperatorString.length) {
				}
				else {
					var score = score+1;             /*If there is a change in length, we know the letter matched, so it is closer to the key!*/
				}
			}
		scoreArray[j] = score;
		}
	var maxIndex = scoreArray.indexOf(Math.max.apply(Math, scoreArray));  /*Find which operator fits best!!*/  
	input = input.replace(shortLetterArray[i], operation[maxIndex]);         /*replace unrefine with refine operator in input string*/  
	};
	var ansArray = [input,eval(input)];
	return (ansArray);
};
