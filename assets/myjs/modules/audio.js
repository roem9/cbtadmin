// ketika menekan tombol edit audio 
$(document).on("click",".editAudio", function(){
    let form = "#editAudio";
    let id_audio = $(this).data("id");
    let data = {id_audio: id_audio};
    let result = ajax(url_base+"audio/get_audio", "POST", data);
    
    $(form+" input[name='id_audio']").val(result.id_audio);
    $(form+" input[name='nama_audio']").val(result.nama_audio);
})

// ketika menyimpan hasil edit audio 
$("#editAudio .btnEdit").click(function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan merubah data audio?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let form = "#editAudio";
            let id_audio = $(form+" input[name='id_audio']").val();
            let nama_audio = $(form+" input[name='nama_audio']").val();
            
            let eror = required(form);
            
            if( eror == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'lengkapi isi form terlebih dahulu'
                })
            } else {
                data = {id_audio: id_audio, nama_audio: nama_audio}
                let result = ajax(url_base+"audio/edit_audio", "POST", data);

                if(result == 1){
                    reload_data();

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil merubah data audio',
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

// ketika menghapus data audio 
$(document).on("click", ".hapusAudio", function(){
    let id_audio = $(this).data("id");

    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menghapus data audio ini?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            data = {id_audio: id_audio}
            let result = ajax(url_base+"audio/hapus_audio", "POST", data);

            if(result == 1){
                reload_data();

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Berhasil menghapus data audio',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'terjadi kesalahan, gagal menghapus data audio'
                })
            }
        }
    })
})

$("#addAudio .btnTambah").click(function(){
    let form = "#addAudio";

    var fd = new FormData();
    var files = $('#file')[0].files;
    
    // Check file selected or not
    if(files.length > 0 ){
        Swal.fire({
            icon: 'question',
            text: 'Yakin akan menambahkan audio baru?',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(function (result) {
            if (result.value) {
                fd.append('file',files[0]);
                fd.append('nama_audio', $(form+" input[name='nama_audio']").val())

                let eror = required(form);
            
                if( eror == 1){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'lengkapi isi form terlebih dahulu'
                    })
                } else {
                    $.ajax({
                        url: url_base+'audio/upload_data',
                        type: 'post',
                        //   data: {fd, nama_audio:nama_audio},
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function(response){

                            if(response == 1){
                                
                                $(form+" .myform").trigger("reset");
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    text: 'Berhasil mengupload file',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } else if(response == 2){
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    text: 'Gagal mengupload file. Format file harus mp3',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } else if(response == 0){
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    text: 'Gagal mengupload file',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }

                            reload_data();

                        },
                    });
                }
            }
        })
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'Pilih file terlebih dahulu',
            showConfirmButton: false,
            timer: 1500
        })
    }
});

