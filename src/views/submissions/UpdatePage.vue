<template>
    <div class="card">
        <div
            id="kt_customer_details_invoices_1"
            class="py-0 tab-pane fade active show card-body pt-0"
            role="tabpanel"
        >
            <DynamicForm
                v-if=" submissionsItem"
                :formFields="formFields"
                :formData="formData"
                :initialData="submissionsItem"
                :defaultFormFields="defaultFormFields"
                mode="edit"
                @checkPermissions="checkPermissions"
                @resetConstraints="resetConstraints(formFields)"
                @submit="handleSubmit"
            ></DynamicForm>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {  ref, onMounted } from "vue";
import DynamicForm from "@/components/Form/DynamicForm.vue";
import { formData, formFields, defaultFormFields } from "@/providers/submissions";
import { useSubmissionsStore } from '@/stores/submissions';
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { cloneDeep } from 'lodash'
import filters from '@/core/helpers/filters.ts'
import {
  getDefaultValues,
  setConstarinsOwnerAndBu,
  setConstrains,
  resetConstraints
} from '@/core/helpers/constrain'

    const submissionsEntity = useSubmissionsStore();
    const submissionsItem = ref();
    const router = useRouter();
    const id = ref(router.currentRoute.value.params.id);

     const handleSubmit = async () => {
      const data = cloneDeep(formData.value)
      const res = await submissionsEntity.update(id.value.toString(), data)
      if (res) {
        Swal.fire({
          text: `${filters.ConvertCamelToTitleName("submissions")} Created Successfully`,
          icon: 'success',
          buttonsStyling: false,
          confirmButtonText: 'Ok',
          heightAuto: false,
          customClass: { confirmButton: 'btn fw-semobold btn-light-primary' }
        }).then(() => {
          router.push(`/submissions-view/${res.id}`)
        })
      }
    }
    const checkPermissions = (field) => {
      setConstrains(formFields, field)
    }
    onMounted(async () => {
      submissionsItem.value = await submissionsEntity.fetchItemAsync(id.value)
      setConstarinsOwnerAndBu(formFields, formData,'submissions_assign_ownership')
      getDefaultValues(formData, defaultFormFields,'submissions_assign_ownership')
    });
</script>
