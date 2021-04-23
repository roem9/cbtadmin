// ketika menekan tombol simpan pada modal tambah bahan 
$("#btnAddBahan").click(function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menambahkan bahan?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let nama_bahan = $("#nama_bahan_add").val();
            let jenis = $("#jenis_add").val();
            let satuan = $("#satuan_add").val();
            let harga_satuan = $("#harga_satuan_add").val();
            let min_stok = $("#min_stok_add").val();

            let eror = required("#formAddBahan");
            
            if( eror == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'lengkapi isi form terlebih dahulu'
                })
            } else {
                data = {nama_bahan: nama_bahan, jenis: jenis, satuan: satuan, harga_satuan: harga_satuan, min_stok: min_stok}
                let result = ajax(url_base+"bahan/add_bahan", "POST", data);

                if(result == 1){
                    reload_data();
                    $("#formAddBahan").trigger("reset");

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil menambahkan data bahan',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'terjadi kesalahan, ulangi input bahan'
                    })
                }
            }
        }
    })
})

// ketika menekan tombol edit bahan 
$(document).on("click",".btnEditBahan", function(){
    let id_bahan = $(this).data("id");
    let data = {id_bahan: id_bahan};
    let result = ajax(url_base+"bahan/get_bahan", "POST", data);
    
    $("#nama_bahan_edit").val(result.nama_bahan);
    $("#jenis_edit").val(result.jenis);
    $("#satuan_edit").val(result.satuan);
    $("#harga_satuan_edit").val(formatRupiah(result.harga_satuan, 'Rp. '));
    $("#min_stok_edit").val(result.min_stok);
    $("#id_bahan_edit").val(result.id_bahan);
})

// ketika menyimpan hasil edit bahan 
$("#btnEditBahan").click(function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan merubah data bahan?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let id_bahan = $("#id_bahan_edit").val();
            let nama_bahan = $("#nama_bahan_edit").val();
            let jenis = $("#jenis_edit").val();
            let satuan = $("#satuan_edit").val();
            let harga_satuan = $("#harga_satuan_edit").val();
            let min_stok = $("#min_stok_edit").val();
            
            let eror = required("#formEditBahan");
            
            if( eror == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'lengkapi isi form terlebih dahulu'
                })
            } else {
                data = {id_bahan: id_bahan, nama_bahan: nama_bahan, jenis: jenis, satuan: satuan, harga_satuan: harga_satuan, min_stok: min_stok}
                let result = ajax(url_base+"bahan/edit_bahan", "POST", data);

                if(result == 1){
                    reload_data();

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil merubah data bahan',
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

// ketika menghapus data bahan 
$(document).on("click", ".btnHapusBahan", function(){
    let data = $(this).data("id");
    data = data.split("|");
    let id_bahan = data[0];
    let nama_bahan = data[1];

    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menghapus data bahan '+nama_bahan+'?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            data = {id_bahan: id_bahan}
            let result = ajax(url_base+"bahan/hapus_bahan", "POST", data);

            if(result == 1){
                reload_data();

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Berhasil menghapus data bahan',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'terjadi kesalahan, gagal menghapus data bahan'
                })
            }
        }
    })
})
