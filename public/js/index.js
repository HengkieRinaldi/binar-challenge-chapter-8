// insert
$("#tambah_pengguna").submit( (event) => {
    alert("data berhasil ditambahkan...")
})
//login
if (window.location.pathname == "/login")
$(".btn.btn-primary.login").submit( (e) => {
    if (data == null) {
    console.log('data tidak ditemukan..')
} else {
    window.location.href = '/game'
}
})

//update
$("#update_pengguna").submit( (event) => {
    event.preventDefault()
    let unindexed_array = $("#update_pengguna").serializeArray()
    let data = {}
    console.log(unindexed_array)
    $.map(unindexed_array, (n, i) => {
        data[n['name']] = n['value']
    })

    let request = {
        "url": `/api-user/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done( (response) => {
        alert("data berhasil diupdate...")
        window.location.href = "/dashboard"
    })
})

//delete
if (window.location.pathname == "/dashboard") {
    $(".btn.border-shadow.delete").on('click', function(e) {
        console.log($(this).attr('dataId'))

        let request = {
            "url": `/api-user/${$(this).attr('dataId')}`,
            "method": "DELETE"
        }

        if (confirm("apakah anda yakin ?")) {
            $.ajax(request).done( (response) => {
                alert("data berhasil dihapus")
                location.reload()
            })
        }
    })
}


let data = getCookie('hengki')
if (data == null) {
    console.log('data tidak ditemukan..')
} else {
    window.location.href = '/game'
}

function login() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    fetch(
        '/login',
        {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        }
    ).then(response => {
        return response.json()
    }).then(result => {
        console.log(result)
        setCookie(result.resultData.username, JSON.stringify(result.resultData), 1)
        let data = getCookie('hengki')
        if (data == null) {
            console.log('data tidak ditemukan..')
        } else {
            window.location.href = '/game'
        }
    }).catch(err => {
        console.log(err)
    })
}

// cookies
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}