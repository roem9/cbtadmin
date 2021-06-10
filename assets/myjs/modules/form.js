// ketika menekan tombol simpan pada modal tambah soal
$("#addForm .btnTambah").click(function () {
	Swal.fire({
		icon: "question",
		text: "Yakin akan menambahkan form baru?",
		showCloseButton: true,
		showCancelButton: true,
		confirmButtonText: "Ya",
		cancelButtonText: "Tidak",
	}).then(function (result) {
		if (result.value) {
			let form = "#addForm";

			let formData = {};
			$(form + " .form").each(function (index) {
				formData = Object.assign(formData, {
					[$(this).attr("name")]: $(this).val(),
				});
			});

			let eror = required(form);

			if (eror == 1) {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "lengkapi isi form terlebih dahulu",
				});
			} else {
				data = formData;
				let result = ajax(url_base + "form/add", "POST", data);

				if (result == 1) {
					loadPagination(0);
					$("#formAddForm").trigger("reset");

					Swal.fire({
						position: "center",
						icon: "success",
						text: "Berhasil menambahkan form",
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "terjadi kesalahan",
					});
				}
			}
		}
	});
});

// ketika menekan tombol edit soal
$(document).on("click", ".editForm", function () {
	let form = "#editForm";
	let id_form = $(this).data("id");
	let data = { id_form: id_form };
	let result = ajax(url_base + "form/get", "POST", data);

    $.each(result, function(key, value){
        $(form+" [name='"+key+"']").val(value)
    })
});

// ketika menyimpan hasil edit soal
$("#editForm .btnEdit").click(function () {
	Swal.fire({
		icon: "question",
		text: "Yakin akan merubah data form?",
		showCloseButton: true,
		showCancelButton: true,
		confirmButtonText: "Ya",
		cancelButtonText: "Tidak",
	}).then(function (result) {
		if (result.value) {
			let form = "#editForm";
            let formData = {};

            $(form+" .form").each(function(index){
                formData = Object.assign(formData, {[$(this).attr("name")]: $(this).val()})
            })

			let eror = required(form);

			if (eror == 1) {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "lengkapi isi form terlebih dahulu",
				});
			} else {
				data = formData;
				let result = ajax(url_base + "form/update", "POST", data);

				if (result == 1) {
					loadPagination(page);

					Swal.fire({
						position: "center",
						icon: "success",
						text: "Berhasil merubah data form",
						showConfirmButton: false,
						timer: 1500,
					});
				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "terjadi kesalahan",
					});
				}
			}
		}
	});
});

// ketika menghapus data soal
$(document).on("click", ".hapusSubSoal", function () {
	let id_sub = $(this).data("id");

	Swal.fire({
		icon: "question",
		text: "Yakin akan menghapus sub soal ini?",
		showCloseButton: true,
		showCancelButton: true,
		confirmButtonText: "Ya",
		cancelButtonText: "Tidak",
	}).then(function (result) {
		if (result.value) {
			data = { id_sub: id_sub };
			let result = ajax(url_base + "subsoal/delete", "POST", data);

			if (result == 1) {
				loadPagination(page);

				Swal.fire({
					position: "center",
					icon: "success",
					text: "Berhasil menghapus sub soal",
					showConfirmButton: false,
					timer: 1500,
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "terjadi kesalahan",
				});
			}
		}
	});
});
