<template>
  <div>
    <ScreenToolbar/>
  <MainScreen />
</div>
</template>

<script>
import MainScreen from '../components/MainScreen'
import ScreenToolbar from '../components/ScreenToolbar'

export default {
  components: {
    MainScreen,
    ScreenToolbar
  },
}
</script>
