$(document).ready(function () {
  buttonDefault()
})

$('#btnSearch').click(function () {
  $('#textOutput').html(``)
  const inputString = $('textarea[id=textInput]').val()
  const inputType = $('input:radio[name=textMethod]:checked').val()
  if (inputString.length < 1) {
    alertDanger(`<b>PERHATIAN!</b> Keyword Pencarian Tidak Boleh Kosong.`)
    $('textarea[id=textInput]').focus()
  } else if (!(inputType)) {
    alertDanger(`<b>PERHATIAN!</b>> Tipe Metode Tidak Tidak Boleh Kosong.`)
  } else {
    alertDefault()
    buttonLoading()
    $.ajax({
      url: `/api/v1/search?type=${inputType}&query=${inputString}`,
      dataType: 'json',
      success: function (data) {
        let valResult = ''
        for (let [indexMusic, dataMusic] of data.data.entries()) {
          valResult += `
            <tr>
              <th scope="row">${indexMusic + 1}</th>
              <td style="text-align:center;vertical-align:middle"><img src="${dataMusic.share.image}" width="50px" height="50px"></td>
              <td>${dataMusic.subtitle ? `${dataMusic.subtitle} - ` : '' }${dataMusic.title}</td>
              <td><a href="${dataMusic.share.href}">KLIK DISINI</a></td>
            </tr>
          `
        }
        $('#textOutput').html(`
          <hr>
            <h5>Berikut Hasil Pencarian Anda (${data.data.length}) :</h4>
          </hr>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Gambar Cover</th>
                <th scope="col">Penyanyi & Judul</th>
                <th scope="col">Link</th>
              </tr>
            </thead>
            <tbody>
              ${valResult}
            </tbody>
          </table>
        `)
        buttonDefault()
        alertSuccess('<b>SELAMAT!</b> Sistem Berhasil Menampilkan Hasil Pencarian Anda.')
      },
      error: function (err) {
        buttonDefault()
        alertDanger(`ERROR: ${err.message}`)
      }
    })
  }
})

function buttonDefault() {
  const btnSubmit = document.getElementById('btnSearch')
  btnSubmit.disabled = false
  btnSubmit.innerText = 'Submit & Cari Lagu'
}

function buttonLoading() {
  const btnSubmit = document.getElementById('btnSearch')
  btnSubmit.disabled = true
  btnSubmit.innerText = 'Silahkan Tunggu Sebentar....'
}

function alertDefault() {
  $('#textAlert').html(``)
}

function alertSuccess(text) {
  $('#textAlert').html(`<div class="alert alert-success" role="alert">${text}</div>`)
}

function alertDanger(text) {
  $('#textAlert').html(`<div class="alert alert-danger" role="alert">${text}</div>`)
}