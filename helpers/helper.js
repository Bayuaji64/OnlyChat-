function dateFormat(data){
    return data.toLocaleString("id-ID",{dateStyle:"medium"})
}

module.exports = {dateFormat}