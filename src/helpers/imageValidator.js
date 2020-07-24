import { helpers } from 'vuelidate/lib/validators'

export const supportedFileType = value => {
  if (!helpers.req(value)) return true 
  
  const allowedFormats = ['jpg', 'jpeg', 'png']
  const extension = value.split('.').pop()
  return allowedFormats.includes(extension)
}