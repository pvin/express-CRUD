var update = document.getElementById('update')

update.addEventListener('click', function () {
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'test2222224545'
        })
    }).then(res => {
        if (res.ok) return res.json()
    }).then(data => {
        console.log(data)
        window.location.reload() })
})



var del = document.getElementById('delete')

del.addEventListener('click', function () {
    fetch('quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'test33'
        })
    })
})