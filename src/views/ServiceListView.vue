<template>
  <div>
    <ScreenToolbar />
    <ServiceList />
  </div>
</template>

<script>
import ServiceList from '../components/ServiceListScreen'
import ScreenToolbar from '../components/ScreenToolbar'

export default {
  components: {
    ServiceList,
    ScreenToolbar
  },
}
</script>
