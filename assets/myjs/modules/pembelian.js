// modal add pembelian
    // when tombol add pembelian click (tombol plus)
    $(document).on("click", "#btnPlusPembelian", function(){
        $("#formAddPembelian").hide();
        $("#btnFormAddPembelian").hide();
        $("#btnFormKirim").show();
        $("#listAllBahan").show();

        let result = ajax(url_base+"bahan/get_all_bahan");

        let html = "";

        result.forEach(data => {
            html += `
                <div class="form-group text-gray-900">
                    <div class="custom-control custom-checkbox small">
                        <input type="checkbox" name="bahan" value="`+data.id_bahan+`|`+data.nama_bahan+`|`+data.satuan+`" class="custom-control-input" id="`+data.id_bahan+`">
                        <label class="custom-control-label" for="`+data.id_bahan+`">`+data.nama_bahan+`</label>
                    </div>
                </div>
            `
        });

        $(".listBahan").html(html);
    })

    // when tombol beli click in modal add pembelian
    $("#btnKirim").click(function(){
        var atLeastOneIsChecked = $('input[name="bahan"]:checked').length;
        if(atLeastOneIsChecked == 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'pilih bahan yang akan dibeli terlebih dahulu'
            })
        } else {
            let i = 1;
            html = "";
            $.each($("input[name='bahan']:checked"), function(){
                data = $(this).val();
                data = data.split("|");
                id_bahan = data[0];
                nama_bahan = data[1];
                satuan = data[2];
                
                html += `
                <div class="input-group input-group-sm">
                    <div class="input-group-prepend">
                        <span class="input-group-text">`+i+`. `+nama_bahan+`</span>
                    </div>
                    <input type="hidden" name="id_bahan_pembelian" value="`+id_bahan+`">
                    <input type="number" name="qty" class="form-control" aria-label="Amount (to the nearest dollar)">
                    <div class="input-group-prepend">
                        <span class="input-group-text">`+satuan+`</span>
                    </div>
                </div>
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Total Harga</span>
                    </div>
                    <input type="text" name="harga_total" class="form-control rupiah" aria-label="Amount (to the nearest dollar)" value="">
                </div>`;

                i++;
            });

            $(".listBahanPembelian").html(html);
            
            $("#btnFormKirim").hide();
            $("#formAddPembelian").show();
            $("#btnFormAddPembelian").show();
            $("#listAllBahan").hide();
        }
    })

    // when tombol bahan click in modal add pembelian 
    $("#btnBahan").click(function(){
        $("#btnFormKirim").show();
        $("#formAddPembelian").hide();
        $("#btnFormAddPembelian").hide();
        $("#listAllBahan").show();
    })

    // when tombol simpan click in modal add pembelian 
    $("#btnAddPembelian").click(function(){
        Swal.fire({
            icon: 'question',
            text: 'Yakin akan menambahkan pengiriman?',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(function (result) {
            if (result.value) {
                let tgl_pembelian = $("#tgl_pembelian_add").val();

                if(tgl_pembelian == ""){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'lengkapi isi form terlebih dahulu'
                    })
                } else {
                    id_bahan = new Array();
                    $.each($("input[name='id_bahan_pembelian']"), function(){
                        id_bahan.push($(this).val());
                    });
                    
                    // untuk cek jik ada field yang tak diisi atau bernilai tidak sesuai
                    let eror = 0;

                    qty = new Array();
                    $.each($("input[name='qty']"), function(){
                        qty.push($(this).val());

                        if($(this).val() == 0 || $(this).val() == ""){
                            eror = 1;
                        }

                    });

                    harga_total = new Array();
                    $.each($("input[name='harga_total']"), function(){
                        harga_total.push($(this).val());

                        if($(this).val() == "Rp. 0" || $(this).val() == ""){
                            eror = 1;
                        }

                    });

                    if(eror == 0){
                        data = {tgl_pembelian: tgl_pembelian, id_bahan:id_bahan, qty:qty, harga_total:harga_total}
                        let result = ajax(url_base+"pembelian/add_pembelian", "POST", data);

                        if(result == 1){
                            loadPagination(0)
                            $("#addPembelian").modal("hide");

                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                text: 'Berhasil menambahkan pembelian',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'terjadi kesalahan, ulangi proses input'
                            })
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'inputkan jumlah bahan, jumlah bahan tidak boleh 0 atau kosong'
                        })
                    }
                }
            }
        })
    })
// modal add pembelian 