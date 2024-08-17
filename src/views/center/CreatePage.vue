
<template>
    <div class="card">
        <div
            id="kt_customer_details_invoices_1"
            class="py-0 tab-pane fade active show card-body pt-0"
            role="tabpanel"
        >
            <DynamicForm
                :formFields="formFields"
                :formData="formData"
                :defaultFormFields="defaultFormFields"
                mode="create"
                @checkPermissions="checkPermissions"
                @resetConstraints="resetConstraints(formFields)"
                @submit="handleSubmit"
            ></DynamicForm>
        </div>
    </div>
</template>

<script lang="ts" setup>
import DynamicForm from "@/components/Form/DynamicForm.vue";
import { formData, formFields, defaultFormFields, type center } from "@/providers/center";
import { useCenterStore } from '@/stores/center';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useRouter } from 'vue-router'
import filters from '@/core/helpers/filters.ts'
import { onMounted } from 'vue'
import {
  getDefaultValues,
  setConstarinsOwnerAndBu,
  setConstrains,
  resetConstraints
} from '@/core/helpers/constrain'

const centerEntity = useCenterStore();

const { push } = useRouter()

const handleSubmit = async (data:center) => {
  const res = await centerEntity.create(data)
 if (res) {
    Swal.fire({
      text: `${filters.ConvertCamelToTitleName("center")} Created Successfully`,
      icon: 'success',
      buttonsStyling: false,
      confirmButtonText: 'Ok',
      heightAuto: false,
      customClass: { confirmButton: 'btn fw-semobold btn-light-primary' }
    }).then(() => {
      push(`center-view/${res.id}`)
    })
  }

};
const checkPermissions = (field) => {
  setConstrains(formFields, field)
}
onMounted(async () => {
  setConstarinsOwnerAndBu(formFields, formData,'center_assign_ownership')
  getDefaultValues(formData, defaultFormFields,'center_assign_ownership')
})
</script>
