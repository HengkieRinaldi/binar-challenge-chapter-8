// variabel
let pilihan = ['batu', 'kertas', 'gunting']
let i = Math.floor(Math.random() * 3)
let pilihanCom = pilihan[i]
const draw = document.getElementById('draw')
let vs = document.querySelector('.vs')
let segarkan = document.querySelector('.segarkan')
let kosong = document.querySelector('#kosong')

// pilihan com
function choose() {
    let pilihan = ['batu', 'kertas', 'gunting']
    let i = Math.floor(Math.random() * 3)
    return pilihan[i]
}
function change() {
    if (pilihanCom == 'batu') {
        kosong.classList.add('warna')
    } else if (pilihanCom == 'kertas') {
        kosong.classList.add('warna')
    } else { kosong.classList.add('warna') }
}
// hasil permainan
function hasil(pilihanCom, player) {
    if (player == pilihanCom) return vs.classList.add('draw'), 'Draw!';
    if (player == 'batu') return (pilihanCom == 'kertas') ? 'COM MENANG' : 'PLAYER MENANG';
    if (player == 'kertas') return (pilihanCom == 'batu') ? 'PLAYER MENANG' : 'COM MENANG';
    if (player == 'gunting') return (pilihanCom == 'batu') ? 'COM MENANG' : 'PLAYER MENANG';
}

// batu
let pbatu = document.querySelector('.batu');
pbatu.addEventListener('click', function OnClick(event) {
    let comChooose = choose();
    let pilihanPlayer = pbatu.className;
    let hasilnya = hasil(comChooose, pilihanPlayer)
    console.log('pilihan komputer :', comChooose)
    console.log('pilihan player :', pilihanPlayer)
    console.log('hasilnya :', hasilnya)
    // manipulasi tulisan
    let vs = document.querySelector('#vs')
    if (hasilnya == 'COM MENANG') {
        vs.classList.remove('vs')
        vs.classList.remove('menang')
        vs.classList.remove('draw')
        vs.classList.add('kalah')
    } else if (hasilnya == 'PLAYER MENANG') {
        vs.classList.remove('vs')
        vs.classList.remove('kalah')
        vs.classList.remove('draw')
        vs.classList.add('menang')
    } else {
        vs.classList.remove('vs')
        vs.classList.remove('menang')
        vs.classList.remove('kalah')
    }
    vs.innerHTML = hasilnya;
})

// kertas
let pkertas = document.querySelector('.kertas');
pkertas.addEventListener('click', function () {
    let comChooose = choose();
    let pilihanPlayer = pkertas.className;
    let hasilnya = hasil(comChooose, pilihanPlayer)
    console.log('pilihan komputer :', comChooose)
    console.log('pilihan player :', pilihanPlayer)
    console.log('hasilnya :', hasilnya)
    // manipulasi tulisan 
    let vs = document.querySelector('#vs')
    if (hasilnya == 'COM MENANG') {
        vs.classList.remove('vs')
        vs.classList.remove('menang')
        vs.classList.remove('draw')
        vs.classList.add('kalah')
    } else if (hasilnya == 'PLAYER MENANG') {
        vs.classList.remove('vs')
        vs.classList.remove('kalah')
        vs.classList.remove('draw')
        vs.classList.add('menang')
    } else {
        vs.classList.remove('vs')
        vs.classList.remove('menang')
        vs.classList.remove('kalah')
    }
    vs.innerHTML = hasilnya;
})

// gunting
let pgunting = document.querySelector('.gunting');
pgunting.addEventListener('click', function () {
    let comChooose = choose();
    let pilihanPlayer = pgunting.className;
    let hasilnya = hasil(comChooose, pilihanPlayer)
    console.log('pilihan komputer :', comChooose)
    console.log('pilihan player :', pilihanPlayer)
    console.log('hasilnya :', hasilnya)
    // manipulasi tulisan 
    let vs = document.querySelector('#vs')
    if (hasilnya == 'COM MENANG') {
        vs.classList.remove('vs')
        vs.classList.remove('menang')
        vs.classList.remove('draw')
        vs.classList.add('kalah')
    } else if (hasilnya == 'PLAYER MENANG') {
        vs.classList.remove('vs')
        vs.classList.remove('kalah')
        vs.classList.remove('draw')
        vs.classList.add('menang')
    } else {
        vs.classList.remove('vs')
        vs.classList.remove('menang')
        vs.classList.remove('kalah')
    }
    vs.innerHTML = hasilnya;
})
// refresh
segarkan.addEventListener('click', function () {
    kosong.classList.remove('warna')
    vs.classList.remove('menang')
    vs.classList.remove('kalah')
    vs.classList.remove('draw')
    vs.classList.add('vs')
    vs.innerHTML = 'VS';
    console.clear('sudah refresh')
    console.log('sudah di refresh')
})