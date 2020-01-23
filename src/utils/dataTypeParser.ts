export function binaryToString(array:Uint8Array): String
{
  let encodedString = encodeURIComponent(String.fromCharCode.apply(null, array));

  return decodeURIComponent(encodedString);
}


export function binaryToNumber(array:Uint8Array): Number
{
  var count:number = 0;
  for(var i = array.length -1; i > -1; i--){
      count += array[i] <<   i*8;
  }
  return count;
}


export async function base64ToBuffer(dataURI:string): Promise<ArrayBuffer>
{
  var res =  await fetch(dataURI).then( res => res.arrayBuffer());
  return  res;
}
