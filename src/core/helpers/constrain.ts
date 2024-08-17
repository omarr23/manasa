import JwtService from '../services/JwtService'

const user = JwtService.getUser()

// formFields: Array<Object>
export const setConstarinsOwnerAndBu = (formFields: any, formData: any, ownershipName: string) => {
  const parentBuPermission = localStorage.getItem('parentBuPermission')
  const permission = findBypermissionCode(ownershipName)

  if (permission.permissionScope == 'BU') {
    const ownerFieldIndex = formFields.value.findIndex(
      (field: any) => field.relationName === 'owner'
    )
    const existedConstrainOwner = formFields.value[ownerFieldIndex].constrains.findIndex(
      (constrain: any) => constrain.key === 'businessUnitId'
    )
    if (ownerFieldIndex !== -1 && existedConstrainOwner == -1) {
      formFields.value[ownerFieldIndex].constrains.push({
        key: 'businessUnitId',
        value: `${JSON.parse(parentBuPermission!).id}`
      })
    }
  }
  if (permission.permissionScope == 'ALL') {
    const ownerFieldIndex = formFields.value.findIndex(
      (field: any) => field.relationName === 'owner'
    )
    const existedConstrainOwner = formFields.value[ownerFieldIndex].constrains.findIndex(
      (constrain: any) => constrain.key === 'businessUnitId'
    )
    if (ownerFieldIndex !== -1 && existedConstrainOwner == -1) {
      formFields.value[ownerFieldIndex].constrains.push({
        key: 'businessUnitId',
        value: `${formData.value.businessUnitId}`
      })
    }
  }
  if (permission.permissionScope == 'PARENTBU') {
    const businessUnitFieldIndex = formFields.value.findIndex(
      (field: any) => field.relationName === 'businessUnit'
    )
    const existedConstrain = formFields.value[businessUnitFieldIndex].constrains.findIndex(
      (constrain: any) => constrain.key === 'parentId'
    )
    if (
      businessUnitFieldIndex !== -1 &&
      existedConstrain == -1 &&
      JSON.parse(parentBuPermission!).parentId != null
    ) {
      formFields.value[businessUnitFieldIndex].constrains.push({
        key: 'parentId',
        value: `${JSON.parse(parentBuPermission!).parentId}`
      })
    }
    const ownerFieldIndex = formFields.value.findIndex(
      (field: any) => field.relationName === 'owner'
    )
    const existedConstrainOwner = formFields.value[ownerFieldIndex].constrains.findIndex(
      (constrain: any) => constrain.key === 'businessUnitId'
    )
    if (ownerFieldIndex !== -1 && existedConstrainOwner == -1) {
      formFields.value[ownerFieldIndex].constrains.push({
        key: 'businessUnitId',
        value: `${formData.value.businessUnitId}`
      })
    }
  }
  applyFieldDisableRules(formFields, permission)
  applyFieldHiddenRules(formFields, permission)
}
const findBypermissionCode = (permissionCode: string) => {
  const permissions = localStorage.getItem('permissionsScope')
  const permission = JSON.parse(permissions!).find(
    (permission: any) => permission.permissionCode === permissionCode
  )
  return permission
}

const applyFieldDisableRules = (formFields: Array<any>, permission: any) => {
  formFields.value.forEach((field: any) => {
    if (
      (field.relationName === 'owner' || field.relationName === 'businessUnit') &&
      permission.permissionScope === 'OWNER'
    ) {
      field.isDisable = true
    } else if (field.relationName === 'businessUnit' && permission.permissionScope === 'BU') {
      field.isDisable = true
    } else {
      field.isDisable = false
    }
  })
}
const applyFieldHiddenRules = (formFields: Array<any>, permission: any) => {
  formFields.value.forEach((field: any) => {
    if (
      (field?.relationName === 'owner' || field?.relationName === 'businessUnit') &&
      permission.permissionScope == 'NONE'
    ) {
      field.isHidden = true
    } else if (
      (field?.relationName === 'owner' || field?.relationName === 'businessUnit') &&
      permission.permissionScope != 'NONE'
    ) {
      field.isHidden = false
    }
  })
}
export const setConstrains = (formFields: any, constrain: any) => {
  formFields.value.forEach((field) => {
    if (field.constrains && constrain.value) {
      let newConstrain = field.constrains.find((constr: any) => constr.key === constrain.key)

      if (newConstrain) {
        newConstrain.value = constrain.value
      }
    }
  })
}
export const getDefaultValues = (formData: any, defaultFormFields: any, ownershipName: string) => {
  const permission = findBypermissionCode(ownershipName)

  if (defaultFormFields.value.length > 0 && permission.permissionScope != 'ALL') {
    defaultFormFields.value.forEach((e: any) => {
      const regex = /\{\{session\.user\.(.*?)\}\}/
      const value = e.defaultValue.match(regex)
      if (e.name == 'businessUnitId' && permission.permissionScope == 'BU') {
        formData.value![e.name] = user![value[1]]
      }
      if (permission.permissionScope == 'OWNER') {
        formData.value![e.name] = user![value[1]]
      }
    })
  }
}
export const resetConstraints = (formFields: any) => {
  const ownerFieldIndex = formFields.findIndex((field: any) => field.relationName === 'owner')

  if (ownerFieldIndex !== -1) {
    formFields[ownerFieldIndex].constrains = formFields[ownerFieldIndex].constrains.filter(
      (constrain: any) => constrain.key !== 'businessUnitId'
    )
  }

  const businessUnitFieldIndex = formFields.findIndex(
    (field: any) => field.relationName === 'businessUnit'
  )

  if (businessUnitFieldIndex !== -1) {
    formFields[ownerFieldIndex].constrains = formFields[ownerFieldIndex].constrains.filter(
      (constrain: any) => constrain.key !== 'parentId'
    )
  }
}
