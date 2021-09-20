export default function Link(path, content){
    
    return (/*html*/ `
        <a onclick="event.preventDefault(); window.navigateTo('${path}')">
            ${content}
        </a>
    `)
}