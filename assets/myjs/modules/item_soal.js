$(document).on("click", ".addItem, #addItem .btnBack", function(){
    let form = "#addItem";

    let html = `
        <div class="mb-3">
            <label class="form-label">Pilih Item</label>
            <div class="form-selectgroup form-selectgroup-boxes d-flex flex-column">
                <label class="form-selectgroup-item flex-fill">
                    <input type="radio" name="item" value="soal" class="form-selectgroup-input">
                    <div class="form-selectgroup-label d-flex align-items-center p-3">
                        <div class="me-3">
                            <span class="form-selectgroup-check"></span>
                        </div>
                        <div>
                            Tambah Soal
                        </div>
                    </div>
                </label>
                <label class="form-selectgroup-item flex-fill">
                    <input type="radio" name="item" value="petunjuk" class="form-selectgroup-input">
                    <div class="form-selectgroup-label d-flex align-items-center p-3">
                        <div class="me-3">
                            <span class="form-selectgroup-check"></span>
                        </div>
                        <div>
                            Tambah Petunjuk / Teks
                        </div>
                    </div>
                </label>
                <label class="form-selectgroup-item flex-fill">
                    <input type="radio" name="item" value="audio" class="form-selectgroup-input">
                    <div class="form-selectgroup-label d-flex align-items-center p-3">
                        <div class="me-3">
                            <span class="form-selectgroup-check"></span>
                        </div>
                        <div>
                            Tambah Audio
                        </div>
                    </div>
                </label>
            </div>
        </div>`;

    $(form+" .modal-body").html(html);

    $(form+" .modal-footer").addClass(`d-flex justify-content-end`);
    $(form+" .modal-footer").removeClass(`d-flex justify-content-between`)
    $(form+" .modal-footer").html(`
        <div class="d-flex justify-content-end">
            <button type="button" class="btn mr-3" data-bs-dismiss="modal">Tutup</button>
            <button type="button" class="btn btn-success btnNext">
                Next 
                <svg width="18" height="18">
                    <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-arrow-right" />
                </svg> 
            </button>
        </div>
    `)
})

$(document).on("click", "#addItem .btnNext", function(){
    let form = "#addItem";
    let item = $(form+" input[name='item']:checked").val()

    if($(form+" input[name='item']:checked").length == 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'pilih item terlebih dahulu'
        })
    } else {
        
        let html = `<input type="text" name="item" value="`+item+`">`;

        if(item == "soal") {
            html += `
                <div class="mb-3">
                    <textarea name="soal" class='ckeditor' id='form-text'>{no}</textarea>
                </div>
                <div class="form-floating mb-3">
                    <textarea name="pilihan_a" class="form-control required" data-bs-toggle="autosize" placeholder="Type something…"></textarea>
                    <label for="" class="col-form-label">Pilihan A</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea name="pilihan_b" class="form-control required" data-bs-toggle="autosize" placeholder="Type something…"></textarea>
                    <label for="" class="col-form-label">Pilihan B</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea name="pilihan_c" class="form-control required" data-bs-toggle="autosize" placeholder="Type something…"></textarea>
                    <label for="" class="col-form-label">Pilihan C</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea name="pilihan_d" class="form-control required" data-bs-toggle="autosize" placeholder="Type something…"></textarea>
                    <label for="" class="col-form-label">Pilihan D</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea name="jawaban" class="form-control required" data-bs-toggle="autosize" placeholder="Type something…"></textarea>
                    <label for="" class="col-form-label">Jawaban</label>
                </div>
                <div class="form-floating mb-3">
                    <select name="penulisan" class="form-control required">
                        <option value="">Pilih Arah Penulisan</option>
                        <option value="LTR">LTR (Left To Right)</option>
                        <option value="RTL">RTL (Right To Left)</option>
                    </select>
                    <label for="">Penulisan</label>
                </div>`;

            
            $(form+" .modal-body").html(html);
            CKEDITOR.replace('form-text');

        } else if(item == "petunjuk"){
            html += `
            <div class="mb-3">
                <textarea name="soal" class='ckeditor' id='form-text'></textarea>
            </div>
            <div class="form-floating mb-3">
                <select name="penulisan" class="form-control required">
                    <option value="">Pilih Arah Penulisan</option>
                    <option value="LTR">LTR (Left To Right)</option>
                    <option value="RTL">RTL (Right To Left)</option>
                </select>
                <label for="">Penulisan</label>
            </div>`;

            $(form+" .modal-body").html(html);
            CKEDITOR.replace('form-text');

        } else if(item == "audio"){
            result = ajax(url_base+"audio/get_all_audio");

            if(result.length != 0){
                
                audio = "";
                result.forEach(data => {
                    audio += `
                        <option value="`+data.id_audio+`">`+data.nama_audio+`</option>
                    `
                });
                
                html += `
                <div class="form-floating mb-3">
                    <select name="audio" class="form-control required">
                        <option value="">Pilih Audio</option>
                        `+audio+`
                    </select>
                    <label for="">Audio</label>
                </div>`;
                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'list audio kosong'
                })

                return;
            }

            $(form+" .modal-body").html(html);
        }

    
        $(form+" .modal-footer").removeClass(`d-flex justify-content-end`);
        $(form+" .modal-footer").addClass(`d-flex justify-content-between`)
        $(form+" .modal-footer").html(`
            <div>
                <button type="button" class="btn btn-success btnBack">
                    <svg width="18" height="18">
                        <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-arrow-left" />
                    </svg> 
                    Back 
                </button>
            </div>
            <div>
                <button type="button" class="btn mr-3" data-bs-dismiss="modal">Tutup</button>
                <button type="button" class="btn btn-success btnAdd">
                    <svg width="18" height="18">
                        <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-plus" />
                    </svg> 
                    Add 
                </button>
            </div>
        `)
    }
})

$(document).on("click", "#addItem .btnAdd", function(){
    let form = "#addItem";
    let item = $(form+" input[name='item']").val();

    if(item == "soal"){
        Swal.fire({
            icon: 'question',
            text: 'Yakin akan menambahkan soal baru?',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(function (result) {
            if (result.value) {
    
                let id_soal = $(form+" input[name='id_soal']").val();
                let tipe_soal = $(form+" input[name='tipe_soal']").val();
                let soal = CKEDITOR.instances['form-text'].getData();
                let pilihan_a = $(form+" textarea[name='pilihan_a']").val();
                let pilihan_b = $(form+" textarea[name='pilihan_b']").val();
                let pilihan_c = $(form+" textarea[name='pilihan_c']").val();
                let pilihan_d = $(form+" textarea[name='pilihan_d']").val();
                let jawaban = $(form+" textarea[name='jawaban']").val();
                let penulisan = $(form+" select[name='penulisan']").val();
    
                let eror = required(form);
    
                if(soal == "") soal = "";
                
                if( eror == 1){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'lengkapi isi form terlebih dahulu'
                    })
                } else {
                    let data_soal = soal+"###"+pilihan_a+"///"+pilihan_b+"///"+pilihan_c+"///"+pilihan_d+"###"+jawaban
                    let data = {id_soal:id_soal, tipe_soal:tipe_soal, item:item, data_soal:data_soal, penulisan:penulisan};
                    let result = ajax(url_base+"soal/add_item_soal", "POST", data);
                    if(result == 1){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            text: 'Berhasil menambahkan item soal',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $("#addItem").modal("hide");
                        load_item(id, soal_tipe)
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            text: 'Gagal menambahkan item soal, silahkan coba refresh page terlebih dahulu',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
                // console.log(id_soal, tipe_soal, item, soal, pilihan_a, pilihan_b, pilihan_c, pilihan_d, jawaban, penulisan);
            }
        })
    } else if(item == "petunjuk"){
        Swal.fire({
            icon: 'question',
            text: 'Yakin akan menambahkan petunjuk atau teks baru?',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(function (result) {
            if (result.value) {
    
                let id_soal = $(form+" input[name='id_soal']").val();
                let tipe_soal = $(form+" input[name='tipe_soal']").val();
                let soal = CKEDITOR.instances['form-text'].getData();
                let penulisan = $(form+" select[name='penulisan']").val();
    
                let eror = required(form);
    
                if(soal == "") eror = 1;
                
                if( eror == 1){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'lengkapi isi form terlebih dahulu'
                    })
                } else {
                    let data = {id_soal:id_soal, tipe_soal:tipe_soal, item:item, data_soal:soal, penulisan:penulisan};
                    let result = ajax(url_base+"soal/add_item_soal", "POST", data);
                    if(result == 1){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            text: 'Berhasil menambahkan item soal',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $("#addItem").modal("hide");
                        load_item(id, soal_tipe)
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            text: 'Gagal menambahkan item soal, silahkan coba refresh page terlebih dahulu',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
                // console.log(id_soal, tipe_soal, item, soal, pilihan_a, pilihan_b, pilihan_c, pilihan_d, jawaban, penulisan);
            }
        })
    } else if(item == "audio"){
        Swal.fire({
            icon: 'question',
            text: 'Yakin akan menambahkan audio baru?',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(function (result) {
            if (result.value) {
    
                let id_soal = $(form+" input[name='id_soal']").val();
                let tipe_soal = $(form+" input[name='tipe_soal']").val();
                let audio = $(form+" select[name='audio']").val();
                let penulisan = "";
    
                let eror = required(form);
    
                if(soal == "") eror = 1;
                
                if( eror == 1){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'lengkapi isi form terlebih dahulu'
                    })
                } else {
                    let data = {id_soal:id_soal, tipe_soal:tipe_soal, item:item, data_soal:audio, penulisan:penulisan};
                    let result = ajax(url_base+"soal/add_item_soal", "POST", data);
                    if(result == 1){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            text: 'Berhasil menambahkan item soal',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $("#addItem").modal("hide");
                        load_item(id, soal_tipe)
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            text: 'Gagal menambahkan item soal, silahkan coba refresh page terlebih dahulu',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
                // console.log(id_soal, tipe_soal, item, soal, pilihan_a, pilihan_b, pilihan_c, pilihan_d, jawaban, penulisan);
            }
        })
    }
})

// ketika menghapus item 
$(document).on("click", ".hapusItem", function(){
    let id_item = $(this).data("id");

    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menghapus item ini?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            data = {id_item: id_item}
            let result = ajax(url_base+"soal/hapus_item", "POST", data);

            if(result == 1){
                load_item(id, soal_tipe);
                // ???
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Berhasil menghapus item',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'terjadi kesalahan, gagal menghapus item'
                })
            }
        }
    })
})

$(document).on("click", ".editItem", function(){
    let form = "#editItem";
    
    let id_item = $(this).data("id");
    let data = {id_item:id_item}
    let result = ajax(url_base+"soal/get_item", "POST", data);
    
    $(form+" input[name='id_item']").val(id_item);
    $(form+" input[name='item']").val(result.item);

    if(result.item == "soal") {
        if(result.penulisan == "RTL") {
            rtl = "selected";
            ltr = "";
        }
        if(result.penulisan == "LTR") {
            rtl = "";
            ltr = "selected";
        }

        html = `
            <div class="mb-3">
                <textarea name="soal" class='ckeditor' id='form-text-edit'>`+result.soal+`</textarea>
            </div>
            <div class="form-floating mb-3">
                <textarea name="pilihan_a" class="form-control required" data-bs-toggle="autosize" placeholder="Type something…">`+result.pilihan_a+`</textarea>
                <label for="" class="col-form-label">Pilihan A</label>
            </div>
            <div class="form-floating mb-3">
                <textarea name="pilihan_b" class="form-control required" data-bs-toggle="autosize" placeholder="Type something…">`+result.pilihan_b+`</textarea>
                <label for="" class="col-form-label">Pilihan B</label>
            </div>
            <div class="form-floating mb-3">
                <textarea name="pilihan_c" class="form-control required" data-bs-toggle="autosize" placeholder="Type something…">`+result.pilihan_c+`</textarea>
                <label for="" class="col-form-label">Pilihan C</label>
            </div>
            <div class="form-floating mb-3">
                <textarea name="pilihan_d" class="form-control required" data-bs-toggle="autosize" placeholder="Type something…">`+result.pilihan_d+`</textarea>
                <label for="" class="col-form-label">Pilihan D</label>
            </div>
            <div class="form-floating mb-3">
                <textarea name="jawaban" class="form-control required" data-bs-toggle="autosize" placeholder="Type something…">`+result.jawaban+`</textarea>
                <label for="" class="col-form-label">Jawaban</label>
            </div>
            <div class="form-floating mb-3">
                <select name="penulisan" class="form-control required" value="`+result.penulisan+`">
                    <option value="">Pilih Arah Penulisan</option>
                    <option value="LTR" `+ltr+`>LTR (Left To Right)</option>
                    <option value="RTL" `+rtl+`>RTL (Right To Left)</option>
                </select>
                <label for="">Penulisan</label>
            </div>`;

        
        $(form+" .modal-body").html(html);
        CKEDITOR.replace('form-text-edit');

    } else if(result.item == "petunjuk"){
        if(result.penulisan == "RTL") {
            rtl = "selected";
            ltr = "";
        }
        if(result.penulisan == "LTR") {
            rtl = "";
            ltr = "selected";
        }

        html = `
            <div class="mb-3">
                <textarea name="soal" class='ckeditor' id='form-text-edit'>`+result.data+`</textarea>
            </div>
            <div class="form-floating mb-3">
                <select name="penulisan" class="form-control required">
                    <option value="">Pilih Arah Penulisan</option>
                    <option value="LTR" `+ltr+`>LTR (Left To Right)</option>
                    <option value="RTL" `+rtl+`>RTL (Right To Left)</option>
                </select>
                <label for="">Penulisan</label>
            </div>`;

        $(form+" .modal-body").html(html);
        CKEDITOR.replace('form-text-edit');

    } else if(result.item == "audio"){
        file = result.data;

        result = ajax(url_base+"audio/get_all_audio");

        console.log(result);

        html = "";
        if(result.length != 0){
            audio = "";
            result.forEach(data => {
                if(file == data.id_audio){
                    audio += `
                        <option value="`+data.id_audio+`" selected>`+data.nama_audio+`</option>`
                } else {
                    audio += `
                        <option value="`+data.id_audio+`">`+data.nama_audio+`</option>`
                }
            });
            
            html += `
            <div class="form-floating mb-3">
                <select name="audio" class="form-control required">
                    <option value="">Pilih Audio</option>
                    `+audio+`
                </select>
                <label for="">Audio</label>
            </div>`;
            
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'list audio kosong'
            })

            return;
        }

        $(form+" .modal-body").html(html);
    }

    $(form+" .modal-footer").addClass(`d-flex justify-content-end`);
    $(form+" .modal-footer").html(`
        <div>
            <button type="button" class="btn mr-3" data-bs-dismiss="modal">Tutup</button>
            <button type="button" class="btn btn-success btnEdit">
                Edit 
            </button>
        </div>
    `)
})

$(document).on("click", "#editItem .btnEdit", function(){
    let form = "#editItem";
    let item = $(form+" input[name='item']").val();

    if(item == "soal"){
        Swal.fire({
            icon: 'question',
            text: 'Yakin akan mengubah soal?',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(function (result) {
            if (result.value) {
    
                let id_item = $(form+" input[name='id_item']").val();
                let soal = CKEDITOR.instances['form-text-edit'].getData();
                let pilihan_a = $(form+" textarea[name='pilihan_a']").val();
                let pilihan_b = $(form+" textarea[name='pilihan_b']").val();
                let pilihan_c = $(form+" textarea[name='pilihan_c']").val();
                let pilihan_d = $(form+" textarea[name='pilihan_d']").val();
                let jawaban = $(form+" textarea[name='jawaban']").val();
                let penulisan = $(form+" select[name='penulisan']").val();
    
                let eror = required(form);
    
                if(soal == "") soal = "";
                
                if( eror == 1){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'lengkapi isi form terlebih dahulu'
                    })
                } else {
                    let data_soal = soal+"###"+pilihan_a+"///"+pilihan_b+"///"+pilihan_c+"///"+pilihan_d+"###"+jawaban
                    let data = {id_item:id_item, data_soal:data_soal, penulisan:penulisan};
                    let result = ajax(url_base+"soal/edit_item", "POST", data);
                    if(result == 1){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            text: 'Berhasil mengubah item soal',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $("#addItem").modal("hide");
                        load_item(id, soal_tipe)
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            text: 'Gagal mengubah item soal, silahkan coba refresh page terlebih dahulu',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
                // console.log(id_soal, tipe_soal, item, soal, pilihan_a, pilihan_b, pilihan_c, pilihan_d, jawaban, penulisan);
            }
        })
    } else if(item == "petunjuk"){
        Swal.fire({
            icon: 'question',
            text: 'Yakin akan mengubah petunjuk atau teks?',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(function (result) {
            if (result.value) {
    
                let id_item = $(form+" input[name='id_item']").val();
                let soal = CKEDITOR.instances['form-text-edit'].getData();
                let penulisan = $(form+" select[name='penulisan']").val();
    
                let eror = required(form);
    
                if(soal == "") eror = 1;
                
                if( eror == 1){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'lengkapi isi form terlebih dahulu'
                    })
                } else {
                    let data = {id_item:id_item, data_soal:soal, penulisan:penulisan};
                    let result = ajax(url_base+"soal/edit_item", "POST", data);
                    if(result == 1){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            text: 'Berhasil mengubah item',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $("#addItem").modal("hide");
                        load_item(id, soal_tipe)
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            text: 'Gagal mengubah item, silahkan coba refresh page terlebih dahulu',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
                // console.log(id_soal, tipe_soal, item, soal, pilihan_a, pilihan_b, pilihan_c, pilihan_d, jawaban, penulisan);
            }
        })
    } else if(item == "audio"){
        Swal.fire({
            icon: 'question',
            text: 'Yakin akan mengubah audio?',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(function (result) {
            if (result.value) {
    
                let id_item = $(form+" input[name='id_item']").val();
                let audio = $(form+" select[name='audio']").val();
                let penulisan = "";
    
                let eror = required(form);
    
                if(soal == "") eror = 1;
                
                if( eror == 1){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'lengkapi isi form terlebih dahulu'
                    })
                } else {
                    let data = {id_item:id_item, data_soal:audio, penulisan:penulisan};
                    let result = ajax(url_base+"soal/edit_item", "POST", data);
                    if(result == 1){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            text: 'Berhasil mengubah audio',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $("#addItem").modal("hide");
                        load_item(id, soal_tipe)
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            text: 'Gagal mengubah item, silahkan coba refresh page terlebih dahulu',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
                // console.log(id_soal, tipe_soal, item, soal, pilihan_a, pilihan_b, pilihan_c, pilihan_d, jawaban, penulisan);
            }
        })
    }
})

$(document).on("click", ".saveUrutan", function(){
    // console.log("cek"
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan mengubah urutan?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            id_item = [];
            $("#dataAjax input[name='id_item']").each(function(){
                id_item.push($(this).val())
            })

            let data = {id_item:id_item};
            let result = ajax(url_base+"soal/edit_urutan", "POST", data)
            if(result == 1){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Berhasil merubah urutan',
                    showConfirmButton: false,
                    timer: 1500
                })
                $("#saveButton").addClass("text-dark");
            }
        }
    })

})