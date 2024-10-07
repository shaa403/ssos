
export default function res_construct(ack, message, data) {
  if (ack) return JSON.stringify({ ack: true, data })
  else return JSON.stringify({ ack: false, message })	
}
