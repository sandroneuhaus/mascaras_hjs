
/**
 * ############################################
 * ESCUTA DOS EVENTOS BASEADOS EM CLASSES
 * ############################################
 */

/**
 * Recuperamos os campos de data para escutar a digitação e Formatar para dd/mm/yyyy
 * <input class="mskDate" name="campo" type="text" />
 */
const elDates = document.getElementsByClassName('mskDate');
for (var i = 0; i < elDates.length; i++) {
    elDates[i].addEventListener('keyup', formatarData);
}

/**
 * Recuperamos os campos de data para escutar a digitação e Formatar para mm/yyyy
 * <input class="mskAnoMes" name="campo" type="text" />
 */
const elMesAno = document.getElementsByClassName('mskMesAno');
for (var i = 0; i < elMesAno.length; i++) {
    elMesAno[i].addEventListener('keyup', formatarDataMesAno);
}

/**
 * Recuperamos os campos de data para escutar a digitação e Formatar para dd/mm/yyyy
 * <input class="mskDateHour" name="campo" type="text" />
 */
const elDatesHours = document.getElementsByClassName('mskDateHour');
for (var i = 0; i < elDatesHours.length; i++) {
    elDatesHours[i].addEventListener('keyup', formatarDataHora);
}

/**
 * Recuperamos os campos de horas para escutar a digitação e Formatar para hh:mm
 * <input class="mskHour" name="campo" type="text" />
 */
const elHours = document.getElementsByClassName('mskHour');
for (var i = 0; i < elHours.length; i++) {
    elHours[i].addEventListener('keyup', formatarHora);
}


/**
 * Recuperamos os campos de número para escutar a digitação e permitir somente números inteiros
 * <input class="soNumeros" name="campo" type="text" />
 */
const elSoNumeros = document.getElementsByClassName('soNumeros');
for (var i = 0; i < elSoNumeros.length; i++) {
    elSoNumeros[i].addEventListener('keypress', somenteNumeros);
}

/**
 * Recuperamos os campos de número para escutar a digitação e permitir somente números, vírgula e ponto
 * <input class="soNumerosDec" name="campo" type="text" />
 */
const elSoNumerosDec = document.getElementsByClassName('soNumerosDec');
for (var i = 0; i < elSoNumerosDec.length; i++) {
    elSoNumerosDec[i].addEventListener('keypress', somenteNumerosDecimal);
}
/**
 * Recuperamos os campos de número Monitoramos o evento keyup e Chamamos o método que formata o número digitado em padrão moeda com duas casas decimais
 * <input class="soNumerosMoeda" name="campo" type="text" />
 */
const elSoNumerosMoeda = document.getElementsByClassName('soNumerosMoeda');
for (var i = 0; i < elSoNumerosMoeda.length; i++) {
    elSoNumerosMoeda[i].addEventListener('keyup', formatarMoeda);
}

/**
 * Recuperamos os campos no Monitoramos o evento keyup e Chamamos o método que formata o número de telefone com 8 ou 9 dígitos
 * <input class="mskFone" name="campo" type="text" />
 */
const elFones = document.getElementsByClassName('mskFone');
for (var i = 0; i < elFones.length; i++) {
    elFones[i].addEventListener('keypress', formataTelefone);
}

/**
 * Recuperamos os campos de cep para escutar a digitação e Formatar para cep
 * <input class="mskCep" name="campo" type="text" />
 */
const elCeps = document.getElementsByClassName('mskCep');
for (var i = 0; i < elCeps.length; i++) {
    elCeps[i].addEventListener('keyup', formatarCep);
}

/**
 * Recuperamos os campos de CNPJ para escutar a digitação e Formatar para cnpj
 * <input class="mskCnpj" name="campo" type="text" />
 */
const elCnpjs = document.getElementsByClassName('mskCnpj');
for (var i = 0; i < elCnpjs.length; i++) {
    elCnpjs[i].addEventListener('keyup', formatarCNPJ);
}
/**
 * Recuperamos os campos de CPF para escutar a digitação e Formatar para cpf
 * <input class="mskCpf" name="campo" type="text" />
 */
const elCpfs = document.getElementsByClassName('mskCpf');
for (var i = 0; i < elCpfs.length; i++) {
    elCpfs[i].addEventListener('keyup', formatarCPF);
}




/**
 * ###########################################################################################
 * Métodos para tratamentos de entrada de dados e máscaras - chamados pelos eventos anteriores
 * ###########################################################################################
 */

/**
 * Método que é chamado pelo evento keypress e Formata a máscara da data para dia mês e ano dd/mm/yyyy
 */
function formatarData(e) {
    var v = e.target.value.replace(/\D/g, "");
    v.replace(/^\s+|\s+$/gm, '');
    
    if (v.length === 11) {
        return false;
    }
    v = v.replace(/(\d{2})(\d)/, "$1/$2");
    v = v.replace(/(\d{2})(\d)/, "$1/$2");
    v = v.substring(0, 10);
    if (v.length === 10) {
        if (!validaData(v)) {
            alert("Data inválida! Por favor corrija.");
        }
        e.target.value = v;
    } else {
        e.target.value = v;
    }

}
/**
 * Método que é chamado pelo evento keypress e Formata a máscara da data para mês e ano mm/yyyy
 */
function formatarDataMesAno(e) {
    var v = e.target.value.replace(/\D/g, "");
    v.replace(/^\s+|\s+$/gm, '');
    
    if (v.length === 5) {
        return false;
    }
    v = v.replace(/(\d{2})(\d)/, "$1/$2");
    v = v.substring(0, 7);
    if (parseInt(v.substring(0, 2)) > 12) {
        v = '12/' + v.substring(3, 7);
    }
    if (v.length === 7 && parseInt(v.substring(3, 7)) < 1900) {
        v = v.substring(0, 2) + '/1900';
    }
    e.target.value = v;
}
/**
 * Método que é chamado pelo evento keypress e Formata a máscara da data e hora para dia mês e ano dd/mm/yyyy hh:mm
 */
function formatarDataHora(e) {
    if (e.keyCode === 8) {
        return false
    }
    var v = e.target.value.replace(/\D/g, "");
    if (v.length === 16) {
        return false;
    }
    /**
     * /^(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})/
     *   "$1/$2/$3 $4:$5"
     */

    if (v.length <= 8) {
        v = v.replace(/(\d{2})(\d)/, "$1/$2");
        v = v.replace(/(\d{2})(\d)/, "$1/$2");
    } else if (v.length > 8 && v.length <= 9) {
        v = v.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3 ");
    } else if (v.length > 9 && v.length < 13) {
        v = v.replace(/(\d{2})(\d{2})(\d{4})(\d{2})/, "$1/$2/$3 $4:");
    } else {
        v = v.replace(/(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})/, "$1/$2/$3 $4:$5");
    }
    v = v.substring(0, 16);

    if (v.length === 16) {
        if (!validaData(v.substring(0, 10))) {
            alert("Data inválida! Por favor corrija.");
        } else {
            if (!validaHora(v.substring(11, 16))) {
                alert("Horário inválido! Por favor corrija.");
            }
        }
        e.target.value = v;
    } else {
        e.target.value = v;
    }

}
/**
 * Método que é chamado pelo evento keypress e Formata a máscara de hora para hh:mm
 */
function formatarHora(e) {
    if (e.keyCode === 8) {
        return false
    }
    var v = e.target.value.replace(/\D/g, "");
    v.replace(/^\s+|\s+$/gm, '');
    if (v.length === 6) {
        return false;
    }
    if (v.length >= 2) {
        v = v.replace(/^(\d\d)(\d{0,5})/, "$1:$2");
    } else {
        v = v.replace(/^(\d*)/, "$1");
    }
    v = v.substring(0, 5);

    if (v.length === 5) {
        if (!validaHora(v)) {
            alert("Horário inválido! Por favor corrija.");
        }
    }
    e.target.value = v;
}

function somenteNumeros(e) {
    var charCode = (e.which) ? e.which : e.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        e.preventDefault();
}
/**
 * Método que é chamado pelo evento keypress e que permite a digitação somente de números virgula e ponto
 */
function somenteNumerosDecimal(e) {
    console.log(e.keyCode);
    var charCode = (e.which) ? e.which : e.keyCode
    if ((charCode > 47 && charCode < 58)) {
        return true;
    } else {
        if (charCode == 8 || charCode == 0 || charCode == 13 || charCode == 44 || charCode == 46) {
            return true;
        } else {
            e.preventDefault();
        }
    }
}
/**
 * Método que é chamado o evento keyup e formata o número digitado em padrão moeda com duas casas decimais
 */
function formatarMoeda(e) {
    var v = e.target.value.replace(/\D/g, "");
    v.replace(/^\s+|\s+$/gm, '');
    v = (v / 100).toFixed(2) + '';
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    e.target.value = v;
}
/**
 * Método que é chamado o evento keyup e formata Máscara de CPF
 */
function formatarCPF(e) {
    var v = e.target.value.replace(/\D/g, "");
    v.replace(/^\s+|\s+$/gm, '');
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    v = v.substring(0, 14);
    e.target.value = v;
}
/**
 * Método que é chamado o evento keyup e formata Máscara de CNPJ
 */
function formatarCNPJ(e) {
    var v = e.target.value.replace(/\D/g, "");
    v.replace(/^\s+|\s+$/gm, '');
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
    v = v.substring(0, 18);
    e.target.value = v;

}

/**
 * Método que é chamado o evento keyup e formata o número do telefone utilizando oito ou nove em algarismos reposicionando o hífen
 */
function formatarCep(e) {
    var v = e.target.value.replace(/\D/g, "");
    v.replace(/^\s+|\s+$/gm, '');
    v = v.replace(/^(\d{5})(\d)/, "$1-$2");
    v = v.substring(0, 9);
    e.target.value = v;
}

function formataTelefone(e) {
    if (e.keyCode === 8) {
        return false
    }
    let tecla = e.key;
    let telefone = e.target.value.replace(/\D+/g, "");

    if (/^[0-9]$/i.test(tecla)) {
        let tamanho = telefone.length;

        if (tamanho > 9) {
            telefone = telefone.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
        } else if (tamanho > 5) {
            telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (tamanho >= 2) {
            telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else {
            telefone = telefone.replace(/^(\d*)/, "($1");
        }
        telefone = telefone.substring(0, 14);
        e.target.value = telefone;
    }
    if (!["Backspace", "Delete"].includes(tecla)) {
        return false;
    }
}

function validaData(dt) {

    var dia = dt.split("/")[0];
    var mes = dt.split("/")[1];
    var ano = dt.split("/")[2];
    var MyData = new Date(ano, mes - 1, dia);

    if ((MyData.getMonth() + 1 != mes) || (MyData.getDate() != dia) || (MyData.getFullYear() != ano)) {
        return false;
    } else {
        return true;
    }
}
function validaHora(hr) {
    if (hr.length !== 5) {
        return false;
    }
    var hrs = hr.split(":")[0];
    var min = hr.split(":")[1];
    if (parseInt(hrs) < 0 || parseInt(hrs) > 23 || parseInt(min) < 0 || parseInt(min) > 60) {
        return false;
    } else {
        return true;
    }
}