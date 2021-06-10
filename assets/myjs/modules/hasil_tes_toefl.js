// profil agency 
$(document).on("click", ".editPeserta", function(){
    let form = "#editPeserta";

    let id = $(this).data("id");
    let data = {id: id};
    let result = ajax(url_base+"tes/get_peserta_toefl", "POST", data)
    
    $.each(result, function(key, value){
        $(form+" [name='"+key+"']").val(value);
    })
})

// edit peserta
$(document).on("click", "#editPeserta .btnEdit", function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan merubah data peserta?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let form = "#editPeserta";
            
            let formData = {};
            $(form+" .form").each(function(index){
                formData = Object.assign(formData, {[$(this).attr("name")]: $(this).val()})
            })

            let eror = required(form);
            
            if( eror == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'lengkapi isi form terlebih dahulu'
                })
            } else {
                data = formData;
                
                let result = ajax(url_base+"tes/edit_peserta_toefl", "POST", data);

                if(result == 1){
                    loadData();

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil merubah data peserta',
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

$(document).on("click", ".addSertifikat", function(){
    let form = "#addSertifikat";

    let id = $(this).data("id");
    let data = {id: id};
    let result = ajax(url_base+"tes/get_peserta_toefl", "POST", data)

    $.each(result, function(key, value){
        if(value == "Tidak Ada") value = ""
        $(form+" [name='"+key+"']").val(value);
    })
})

// edit peserta
$(document).on("click", "#addSertifikat .btnTambah", function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menambahkan sertifikat?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let form = "#addSertifikat";
            
            let formData = {};
            $(form+" .form").each(function(index){
                formData = Object.assign(formData, {[$(this).attr("name")]: $(this).val()})
            })

            let eror = required(form);

            if( eror == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'lengkapi isi form terlebih dahulu'
                })
            } else {
                data = formData;
                
                let result = ajax(url_base+"tes/add_sertifikat_toefl", "POST", data);

                if(result == 1){
                    loadData();

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil menambahkan sertifikat',
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

$(document).on("click", ".editSertifikat", function(){
    let form = "#editSertifikat";

    let id = $(this).data("id");
    let data = {id: id};
    let result = ajax(url_base+"tes/get_peserta_toefl", "POST", data)

    $.each(result, function(key, value){
        if(value == "Tidak Ada") value = ""
        $(form+" [name='"+key+"']").val(value);
    })
})

$(document).on("click", "#editSertifikat .btnEdit", function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan merubah sertifikat?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let form = "#editSertifikat";
            
            let formData = {};
            $(form+" .form").each(function(index){
                formData = Object.assign(formData, {[$(this).attr("name")]: $(this).val()})
            })

            let eror = required(form);
            

            if( eror == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'lengkapi isi form terlebih dahulu'
                })
            } else {
                data = formData;
                
                let result = ajax(url_base+"tes/edit_sertifikat_toefl", "POST", data);

                if(result == 1){
                    loadData();

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil merubah sertifikat',
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

// upload gambar 
$(document).on("click", ".uploadGambar", function(){
    let id = $(this).data("id");
    let data = {id:id};
    let result = ajax(url_base+"tes/get_peserta_toefl", "POST", data);

    $("[name='id']").val(result.id);
    $("[name='nama']").val(result.nama);
})

// tambah gambar 
$("#uploadGambar .btnTambah").click(function(){
    let form = "#uploadGambar";

    var fd = new FormData();
    var files = $('#file')[0].files;
    
    // Check file selected or not
    if(files.length > 0 ){
        Swal.fire({
            icon: 'question',
            text: 'Yakin akan menambahkan gambar baru?',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(function (result) {
            if (result.value) {
                fd.append('file',files[0]);
                fd.append('id', $(form+" input[name='id']").val())

                let eror = required(form);

                loading();

                if( eror == 1){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'lengkapi isi form terlebih dahulu'
                    })
                } else {
                    $.ajax({
                        url: url_base+'tes/upload_data_toefl',
                        type: 'post',
                        //   data: {fd, nama_audio:nama_audio},
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function(response){

                            if(response == 1){
                                
                                $(form).modal("hide");
                                $(".myform").trigger("reset");
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
                                    text: 'Gagal mengupload file. Format file harus PNG, JPG atau JPEG',
                                    // showConfirmButton: false,
                                    // timer: 1500
                                })
                            } else if(response == 0){
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    text: 'Gagal mengupload file',
                                    // showConfirmButton: false,
                                    // timer: 1500
                                })
                            }

                            loadData();

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