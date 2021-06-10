$(".editSetting").click(function(){
    let result = ajax(url_base+"home/getSetting");

    let form = "#editSetting";
    $(form+" [name='web_admin']").val(result.web_admin.value);
    $(form+" [name='web_peserta']").val(result.web_peserta.value);
})

$("#editSetting .btnEdit").click(function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan merubah data setting?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let form = "#editSetting";
            let web_admin = $(form+" [name='web_admin']").val();
            let web_peserta = $(form+" [name='web_peserta']").val();
            
            let eror = required(form);
            
            if( eror == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'lengkapi isi form terlebih dahulu'
                })
            } else {
                data = {web_admin: web_admin, web_peserta: web_peserta}
                let result = ajax(url_base+"home/edit_setting", "POST", data);

                if(result == 1){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil merubah data setting',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'terjadi kesalahan'
                    })
                }
            }
        }
    })
})