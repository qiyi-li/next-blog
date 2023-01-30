export const emptyValidate = (val:object):{}=>{
  const keys = Object.keys(val)
  let hasError=false
  //TODO
 const errors=  keys.reduce((result,k)=>{
    if(val[k].trim()===''){
      result[k]=['请输入完整后再提交']
    }
    return result
  },{})
  return [hasError,errors]
}
