<template>
  <div>
    <div v-if="$utils.hasAuth('CustomerService.Appointment.view')">3244</div>
    <layout>
    </layout>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  created () {
    console.log(this.$utils.topNavs, 'created');
  },
  mounted () {
    setTimeout(() => {
      console.log(
        this.$utils.hasAuth('CustomerService.Appointment.view'),
        'hasAuth'
      );
    }, 3000);

    console.log(this.$utils.topNavs, 'mounted');
    console.log(this.$utils.topNavs, 'mounted');
    setTimeout(() => {
      console.log(this, 'vue2');
    }, 3000);
  },
};
</script>
