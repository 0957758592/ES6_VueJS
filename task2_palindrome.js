
// madam
// nurses run 
// 4567654
// 234432

function isPalindrome(data) {

    if (data.includes(' ')) {
        data = new String(data.replace(' ', ''));
    }

    var head = 0;
    var tail = data.length - 1;

    while (head !== tail) {

        var isMiddle = (head + 1 === tail);
        var equalsData = data.charAt(head) === data.charAt(tail);

        if (equalsData && !isMiddle) {
            head++;
            tail--;
        } else if (equalsData && isMiddle) {
            return true
        } else {
            return false
        }
    }
    return true
}

isPalindrome('nurses run')