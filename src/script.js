var LINE_ERROR = 'pep-column-count error';
var LINE_CLEAN = 'pep-column-count clean';

HTMLCollection.prototype.forEach = Array.prototype.forEach;

// Creates the counting div element on the document and returns
function create_linecount_div(char_count, style_classes){
    var new_element = document.createElement('div');
    new_element.setAttribute('class', style_classes);
    var new_content = document.createTextNode(char_count);
    new_element.appendChild(new_content);
    return new_element;
}

function process_udiff(element, all_elements, line_starter){
    var gutter = element.getElementsByClassName('gutter')[0];
    var span_element = element.getElementsByClassName('source')[0];
    var span_content = get_text(span_element);
    if(span_content[0] != line_starter){
        console.log("Something is wrong");
    }
    span_content = span_content.substring(1);
    var char_count = span_content.length;
    var style = (char_count > 100)?LINE_ERROR:LINE_CLEAN;
    var new_element = create_linecount_div(char_count, style);
    element.insertBefore(new_element, span_element);
}

function process_diff_container(element, index, array){
    // Grab all the additions, deletions, and common lines separately
    var additions = element.getElementsByClassName('udiff-line addition');
    var deletions = element.getElementsByClassName('udiff-line deletion');
    var commons = element.getElementsByClassName('udiff-line common');

    var context = {
    'line_starter': '+'
    };

    additions.forEach(function(element, index, array){
            process_udiff(element, array, this['line_starter']);
        },
        context);
}


var all_diff_containers = document.getElementsByClassName('diff-container');
all_diff_containers.forEach(process_diff_container);
