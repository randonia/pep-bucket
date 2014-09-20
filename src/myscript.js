// Grab all the additions, deletions, and common lines separately
additions = document.getElementsByClassName('udiff-line addition');
deletions = document.getElementsByClassName('udiff-line deletion');
commons = document.getElementsByClassName('udiff-line common');

for(var i = 0; i < additions.length; ++i){
    var gutter = additions[i].getElementsByClassName('gutter')[0];
    var span_element = additions[i].getElementsByClassName('source')[0];
    var span_content = span_element.innerText;
    if(span_content[0] != '+'){
	console.log("Something is wrong");
    }
    span_content = span_content.substring(1);
    var char_count = span_content.length;
    console.log('Count is ', char_count, span_content);
    if(char_count > 100){
	var new_element = document.createElement('div');
	new_element.setAttribute('class', 'pep-column-count');
	var new_content = document.createTextNode(char_count);
	new_element.appendChild(new_content);
	additions[i].insertBefore(new_element, span_element);
    }
}
