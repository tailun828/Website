var input = '((4)+(5))^(6)';
if(input.indexOf('^') !== -1)
{
  var i = input.indexOf('^');
  var baseArray = [];
  var powerArray = [];
  var counter = 0
  for (var i = input.indexOf('^'); i>=0; i--) {
  	if (input[i] === ')') {
  		baseArray = baseArray + [i];
  		counter = counter +1;
  	};
  };

  document.write(baseArray);