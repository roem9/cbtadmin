// ketika menekan tombol simpan pada modal tambah tes 
$("#addTes .btnTambah").click(function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menambahkan tes baru?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let form = "#addTes";

            let tgl_tes = $(form+" input[name='tgl_tes']").val();
            let tgl_pengumuman = $(form+" input[name='tgl_pengumuman']").val();
            let id_soal = $(form+" select[name='id_soal']").val();
            let waktu = $(form+" input[name='waktu']").val();
            let password = $(form+" input[name='password']").val();
            let catatan = $(form+" textarea[name='catatan']").val();

            let eror = required("#addTes");
            
            if( eror == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'lengkapi isi form terlebih dahulu'
                })
            } else {
                data = {tgl_tes: tgl_tes, tgl_pengumuman: tgl_pengumuman, id_soal: id_soal, waktu: waktu, password: password, catatan: catatan}
                let result = ajax(url_base+"tes/add_tes", "POST", data);

                if(result == 1){
                    loadPagination(0);
                    $("#formAddTes").trigger("reset");

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil menambahkan data tes',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'terjadi kesalahan, ulangi input tes'
                    })
                }
            }
        }
    })
})

// ketika menekan tombol edit tes 
$(document).on("click",".editTes", function(){
    let form = "#editTes";
    let id_tes = $(this).data("id");
    let data = {id_tes: id_tes};
    let result = ajax(url_base+"tes/get_tes", "POST", data);
    
    $(form+" input[name='id_tes']").val(result.id_tes);
    $(form+" input[name='tgl_tes']").val(result.tgl_tes);
    $(form+" input[name='tgl_pengumuman']").val(result.tgl_pengumuman);
    $(form+" select[name='id_soal']").val(result.id_soal);
    $(form+" input[name='waktu']").val(result.waktu);
    $(form+" input[name='password']").val(result.password);
    $(form+" textarea[name='catatan']").val(result.catatan);
    $(form+" select[name='status']").val(result.status);
})

// ketika menyimpan hasil edit tes 
$("#editTes .btnEdit").click(function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan merubah data tes?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let form = "#editTes";
            let id_tes = $(form+" input[name='id_tes']").val();
            let tgl_tes = $(form+" input[name='tgl_tes']").val();
            let tgl_pengumuman = $(form+" input[name='tgl_pengumuman']").val();
            let id_soal = $(form+" select[name='id_soal']").val();
            let waktu = $(form+" input[name='waktu']").val();
            let password = $(form+" input[name='password']").val();
            let catatan = $(form+" textarea[name='catatan']").val();
            let status = $(form+" select[name='status']").val();
            
            let eror = required(form);
            
            if( eror == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'lengkapi isi form terlebih dahulu'
                })
            } else {
                data = {id_tes: id_tes, tgl_tes: tgl_tes, tgl_pengumuman: tgl_pengumuman, id_soal: id_soal, waktu: waktu, password: password, status: status, catatan: catatan}
                let result = ajax(url_base+"tes/edit_tes", "POST", data);

                if(result == 1){
                    loadPagination(page);

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil merubah data tes',
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

// ketika menghapus data tes 
$(document).on("click", ".hapusTes", function(){
    let id_tes = $(this).data("id");

    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menghapus data tes ini?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            data = {id_tes: id_tes}
            let result = ajax(url_base+"tes/hapus_tes", "POST", data);

            if(result == 1){
                loadPagination(page);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Berhasil menghapus data tes',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'terjadi kesalahan, gagal menghapus data tes'
                })
            }
        }
    })
})
