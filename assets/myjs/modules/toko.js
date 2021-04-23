        // when tombol add toko click
        $("#btnPlusToko").click(function(){
            
            $("#kecamatan_lainnya_add").prop("disabled", true);
            $("#kecamatan_lainnya_add").prop("required", false);

            list_kecamatan();

        })

        // jika opsi kecamatan berubah 
        $("#kecamatan_add").change(function(){
            let sumber = $(this).val();
            if(sumber == "Lainnya"){
                $("#kecamatan_lainnya_add").prop("disabled", false);
                $("#kecamatan_lainnya_add").prop("required", true);
                $("#kecamatan_lainnya_add").addClass("required");
            } else {
                $("#kecamatan_lainnya_add").val("");
                $("#kecamatan_lainnya_add").prop("disabled", true);
                $("#kecamatan_lainnya_add").prop("required", false);
                $("#kecamatan_lainnya_add").removeClass("required");
            }
        })
        
        // tekan tombol simpan pada modal tambah toko 
        $("#btnAddToko").click(function(){
            Swal.fire({
                icon: 'question',
                text: 'Yakin akan menambahkan toko?',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            }).then(function (result) {
                if (result.value) {
                    let tgl_bergabung = $("#tgl_bergabung_add").val();
                    let nama_toko = $("#nama_toko_add").val();
                    let alamat = $("#alamat_add").val();
                    let pj = $("#pj_add").val();
                    let no_hp = $("#no_hp_add").val();
                    let kecamatan = $("#kecamatan_add").val();
                    let kecamatan_lainnya = $("#kecamatan_lainnya_add").val();

                    if(kecamatan != "Lainnya"){
                        kecamatan = kecamatan;
                    } else {
                        kecamatan = kecamatan_lainnya
                    }
                    
                    let eror = required("#formAddToko");
            
                    if( eror == 1){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'lengkapi isi form terlebih dahulu'
                        })
                    } else {
                        data = {tgl_bergabung: tgl_bergabung, nama_toko: nama_toko, alamat: alamat, pj: pj, no_hp: no_hp, kecamatan: kecamatan}
                        let result = ajax(url_base+"toko/add_toko", "POST", data);

                        if(result == 1){
                            reload_data();
                            $("#formAddToko").trigger("reset");

                            list_kecamatan();

                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                text: 'Berhasil menambahkan data toko',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'terjadi kesalahan, ulangi input toko'
                            })
                        }
                    }
                }
            })
        })

        // jika opsi kecamatan berubah pada menu edit 
        $("#kecamatan_edit").change(function(){
            let sumber = $(this).val();
            if(sumber == "Lainnya"){
                $("#kecamatan_lainnya_edit").prop("disabled", false);
                $("#kecamatan_lainnya_edit").prop("required", true);
                $("#kecamatan_lainnya_edit").addClass("required");
            } else {
                $("#kecamatan_lainnya_edit").val("");
                $("#kecamatan_lainnya_edit").prop("disabled", true);
                $("#kecamatan_lainnya_edit").prop("required", false);
                $("#kecamatan_lainnya_edit").removeClass("required");
            }
        })

        // when tombol edit toko click 
        $(document).on("click",".btnEditToko", function(){
            let id_toko = $(this).data("id");
            let data = {id_toko: id_toko};
            let result = ajax(url_base+"toko/get_toko", "POST", data);
            
            list_kecamatan();

            $("#kecamatan_lainnya_edit").prop("disabled", true);
            $("#kecamatan_lainnya_edit").prop("required", false);

            $("#id_toko_edit").val(result.id_toko);
            $("#tgl_bergabung_edit").val(result.tgl_bergabung);
            $("#nama_toko_edit").val(result.nama_toko);
            $("#alamat_edit").val(result.alamat);
            $("#kecamatan_edit").val(result.kecamatan);
            $("#pj_edit").val(result.pj);
            $("#no_hp_edit").val(result.no_hp);
        })

        // when tombol simpan click in modal edit toko 
        $("#btnEditToko").click(function(){
            Swal.fire({
                icon: 'question',
                text: 'Yakin akan merubah data toko?',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            }).then(function (result) {
                if (result.value) {
                    let id_toko = $("#id_toko_edit").val();
                    let tgl_bergabung = $("#tgl_bergabung_edit").val();
                    let nama_toko = $("#nama_toko_edit").val();
                    let alamat = $("#alamat_edit").val();
                    let pj = $("#pj_edit").val();
                    let no_hp = $("#no_hp_edit").val();

                    let kecamatan = $("#kecamatan_edit").val();
                    let kecamatan_lainnya = $("#kecamatan_lainnya_edit").val();

                    if(kecamatan != "Lainnya"){
                        kecamatan = kecamatan;
                    } else {
                        kecamatan = kecamatan_lainnya
                    }
                    
                    let eror = required("#formEditToko");
            
                    if( eror == 1){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'lengkapi isi form terlebih dahulu'
                        })
                    } else {
                        data = {id_toko: id_toko, tgl_bergabung: tgl_bergabung, nama_toko: nama_toko, alamat: alamat, pj: pj, no_hp: no_hp, kecamatan: kecamatan}
                        let result = ajax(url_base+"toko/edit_toko", "POST", data);

                        if(result == 1){
                            reload_data();
                            $("#formAddToko").trigger("reset");

                            list_kecamatan();

                            $("#kecamatan_edit").val(kecamatan);
                            $("#kecamatan_lainnya_edit").prop("disabled", true);
                            $("#kecamatan_lainnya_edit").prop("required", false);
                            $("#kecamatan_lainnya_edit").val("");

                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                text: 'Berhasil merubah data toko',
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

        // when tombol delete toko click 
        $(document).on("click", ".btnHapusToko", function(){
            let data = $(this).data("id");
            data = data.split("|");
            let id_toko = data[0];
            let nama_toko = data[1];

            Swal.fire({
                icon: 'question',
                text: 'Yakin akan menghapus data toko '+nama_toko+'?',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak'
            }).then(function (result) {
                if (result.value) {
                    data = {id_toko: id_toko}
                    let result = ajax(url_base+"toko/hapus_toko", "POST", data);

                    if(result == 1){
                        reload_data();

                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            text: 'Berhasil menghapus data toko',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'terjadi kesalahan, gagal menghapus data toko'
                        })
                    }
                }
            })
        })
