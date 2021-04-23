// ketika menekan tombol simpan pada modal tambah soal 
$("#addSoal .btnTambah").click(function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menambahkan soal baru?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let form = "#addSoal";

            let nama_soal = $(form+" input[name='nama_soal']").val();
            let tgl_pembuatan = $(form+" input[name='tgl_pembuatan']").val();
            let catatan = $(form+" textarea[name='catatan']").val();

            let eror = required("#addSoal");
            
            if( eror == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'lengkapi isi form terlebih dahulu'
                })
            } else {
                data = {nama_soal: nama_soal, tgl_pembuatan: tgl_pembuatan, catatan: catatan}
                let result = ajax(url_base+"soal/add_soal", "POST", data);

                if(result == 1){
                    loadPagination(0);
                    $("#formAddSoal").trigger("reset");

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil menambahkan data soal',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'terjadi kesalahan, ulangi input soal'
                    })
                }
            }
        }
    })
})

// ketika menekan tombol edit soal 
$(document).on("click",".editSoal", function(){
    let form = "#editSoal";
    let id_soal = $(this).data("id");
    let data = {id_soal: id_soal};
    let result = ajax(url_base+"soal/get_soal", "POST", data);
    
    $(form+" input[name='id_soal']").val(result.id_soal);
    $(form+" input[name='tgl_pembuatan']").val(result.tgl_pembuatan);
    $(form+" input[name='nama_soal']").val(result.nama_soal);
    $(form+" textarea[name='catatan']").val(result.catatan);
})

// ketika menyimpan hasil edit soal 
$("#editSoal .btnEdit").click(function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan merubah data soal?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let form = "#editSoal";
            let id_soal = $(form+" input[name='id_soal']").val();
            let tgl_pembuatan = $(form+" input[name='tgl_pembuatan']").val();
            let catatan = $(form+" textarea[name='catatan']").val();
            let nama_soal = $(form+" input[name='nama_soal']").val();
            
            console.log(catatan);

            let eror = required(form);
            
            if( eror == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'lengkapi isi form terlebih dahulu'
                })
            } else {
                data = {id_soal: id_soal, tgl_pembuatan: tgl_pembuatan, nama_soal: nama_soal, catatan: catatan}
                let result = ajax(url_base+"soal/edit_soal", "POST", data);

                if(result == 1){
                    loadPagination(page);

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil merubah data soal',
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

// ketika menghapus data soal 
$(document).on("click", ".hapusSoal", function(){
    let id_soal = $(this).data("id");

    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menghapus data soal ini?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            data = {id_soal: id_soal}
            let result = ajax(url_base+"soal/hapus_soal", "POST", data);

            if(result == 1){
                loadPagination(page);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Berhasil menghapus data soal',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'terjadi kesalahan, gagal menghapus data soal'
                })
            }
        }
    })
})
