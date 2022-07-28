<template>
  <h2>{{ formatedDate }}</h2>
</template>

<script>
export default {
  name: "gf-date",
  props: {
    date: null,
  },
  data() {
    return {
      formatedDate: null,
      months: {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
      },
    };
  },
  methods: {
    formateDate(raw) {
      let date = new Date(raw);

      console.log(this.months[date.getUTCMonth()]);
      return (
        this.months[date.getUTCMonth()] +
        " " +
        date.getUTCDate() +
        ", " +
        date.getUTCFullYear()
      );
    },
  },
  mounted() {
    this.formatedDate = this.formateDate(this.date);
  },
  watch: {
    date: function (newVal) {
      this.formatedDate = this.formateDate(newVal);
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 16px;
  color: #6e6e73;
  font-weight: 500;
  line-height: 45px;
}
</style>
