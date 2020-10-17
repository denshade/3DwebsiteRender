

function getSourceAsDOM(url)
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    parser=new DOMParser();
    return parser.parseFromString(xmlhttp.responseText,"text/html");
}

const getElementDetails = (elementName, clientRectList, level) =>
{
    if (clientRectList.length > 0)
    {
        clientRect = clientRectList.item(0);
        const summary = {
            name : elementName,
            x : clientRect.x,
            y : clientRect.y,
            level : level,
            width : clientRect.width,
            height : clientRect.height,
        };
        return summary;
    }
}
const scrapeElementChildren = (element, level) => {
    var objects = [];
    for (var child of element.children) {
        objects.push(getElementDetails(child.tagName, child.getClientRects(), level));
        objects = objects.concat(scrapeElementChildren(child, level + 1));
    }
    return objects;
}
const scrapeScreen = () => {
    var objects = [];
    var bodies = document.getElementsByTagName("body");
    objects.push(getElementDetails(bodies.item(0).tagName, bodies.item(0).getClientRects(), 0));
    objects = objects.concat(scrapeElementChildren(bodies.item(0), 1));
    return objects;
}
