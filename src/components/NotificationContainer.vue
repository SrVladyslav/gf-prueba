<template>
  <div class="notification__container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from "@/components/NotificationBar.vue";
import { mapState } from "vuex";

export default {
  components: {
    NotificationBar,
  },
  computed: mapState("notification", ["notifications"]),
};
</script>

<style scoped>
.notification__container {
  position: fixed;
  bottom: 10px;
  right: 10px;
  max-width: 450px;
  z-index: 800 !important;
}

@media (max-width: 450px) {
  .notification__container {
    bottom: 0px;
    right: 0px;
    width: 100%;
    min-width: 100%;
    padding: 5%;
  }
}
</style>