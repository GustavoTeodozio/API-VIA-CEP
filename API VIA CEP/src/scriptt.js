$(document).ready(function() {
    $("#cep").blur(pesquisacep);
  });
  
  function limpa_formulario_cep() {
    $("#rua").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#uf").val("");
    $("#ddd").val("");
  }
  
  function pesquisacep() {
    var cep = $("#cep").val().replace(/\D/g, '');
    if (cep !== "") {
  
      var validacep = /^[0-9]{8}$/;
  
      if (validacep.test(cep)) {
  
        $("#rua").val("...");
        $("#bairro").val("...");
        $("#cidade").val("...");
        $("#uf").val("...");
        $("#ddd").val("...");
        
        $.ajax({
          url: "https://viacep.com.br/ws/" + cep + "/json/",
          type: "GET",
          dataType: "json",
          beforeSend: function() {
            swal("Aguarde", "Carregando...", "info");
          },
          success: function(data) {
            if (data.erro) { // Verifica se o CEP é inválido
              swal({
                title: "CEP INVÁLIDO",
                text: "O CEP informado é inválido.",
                icon: "error"
              });
            } else {
              swal({
                title: "CEP ENCONTRADO",
                icon: "success"
              });
              $("#cep").val(data.cep);
              $("#rua").val(data.logradouro);
              $("#bairro").val(data.bairro);
              $("#localidade").val(data.localidade);
              $("#uf").val(data.uf);
              $("#ddd").val(data.ddd);
            }
          },
          error: function(error) {
            swal({
              title: "Erro",
              text: "Ocorreu um erro na requisição.",
              icon: "error"
            }).then(limpa_formulario_cep);
          }
        });
  
      }
    }
  }
  
