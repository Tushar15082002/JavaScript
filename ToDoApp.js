let tasklist = []

let editnum = 0
if(localStorage.getItem('todo') != null)
    tasklist =  JSON.parse(localStorage.getItem('todo'))

display=() => {
    for(let i=0; i<tasklist.length; i++) {
        let row = document.createElement('tr')
        let delbut = document.createElement('button')
        let edbut = document.createElement('button')
        
        row.innerHTML = `<th>${i+1}</th>
        <th>${tasklist[i].title}</th>
        <th>${tasklist[i].desc}</th>
        <th><button type="button" onclick="edit(${i})" class="btn btn-warning">Edit</button>
        <button type="button" onclick="del(${i})" class="btn btn-danger">Delete</button></th>`
        list.appendChild(row)
    }
}

display()

taskadd.onclick=() => {
    let titlesize = title.value.trim().length
    if(titlesize != 0) {
        tasklist.push({'title': title.value , 'desc' : desc.value})
        task = JSON.stringify(tasklist)
        localStorage.setItem('todo',task)
        let row = document.createElement('tr')
        row.innerHTML = `<th>${tasklist.length}</th>
        <th>${title.value}</th>
        <th>${desc.value}</th>
        <th><button type="button" onclick="edit(${tasklist.length})" class="btn btn-warning">Edit</button>
        <button type="button" onclick="del(${tasklist.length})" class="btn btn-danger">Delete</button></th>`
        list.appendChild(row)
    }
    title.value = ""
    desc.value = ""
}

edit=(id) => {
    title.value = tasklist[id].title
    desc.value = tasklist[id].desc
    taskadd.style.display = 'none'
    taskedit.style.display = 'block'
    editnum = id
}

taskedit.addEventListener("click", function(){
    let todoedit = localStorage.getItem('todo')
    let editobj = JSON.parse(todoedit) 
    editobj[editnum].title = title.value
    editobj[editnum].desc = desc.value
    taskadd.style.display = 'block'
    taskedit.style.display = 'none'
    localStorage.setItem('todo',JSON.stringify(editobj))
    tasklist[editnum].title = title.value
    tasklist[editnum].desc = desc.value
    title.value = ""
    desc.value = ""
    list.innerHTML = `<tr>
                    <th>SNo.</th><th>Title</th><th>Description</th><th>Actions</th>
                    </tr>`
    display()
})

del=(id) => {   
    tasklist.splice(id,1)
    let task = JSON.stringify(tasklist)
    localStorage.setItem('todo',task)
    list.innerHTML = `<tr>
                        <th>SNo.</th><th>Title</th><th>Description</th><th>Actions</th>
                      </tr>`
    display()
}