<template>
  <div id="calendar">
    <h1>calendar</h1>

    <table class="calendar">
      <thead>
        <th colspan="7">
          <p><span> {{ calendar.year }} </span>년 <span> {{ calendar.month }} </span>월</p>
        </th>
      </thead>
      <thead>
        <th>일</th>
        <th>월</th>
        <th>화</th>
        <th>수</th>
        <th>목</th>
        <th>금</th>
        <th>토</th>
      </thead>
      <tbody>
        <tr>
          <td v-for="o in calendar.dateArray[0]" v-bind:class="{off : o.rsvList.length == 0}">
            {{ o.day }}
            <p v-for="i in o.rsvList">{{ i.prodNm }} : {{ i.ordStatCd }}</p>
          </td>
        </tr>
        <tr>
          <td v-for="o in calendar.dateArray[1]" v-bind:class="{off : o.rsvList.length == 0}">
            {{ o.day }}
            <p v-for="i in o.rsvList">{{ i.prodNm }} : {{ i.ordStatCd }}</p>
          </td>
        </tr>
        <tr>
          <td v-for="o in calendar.dateArray[2]" v-bind:class="{off : o.rsvList.length == 0}">
            {{ o.day }}
            <p v-for="i in o.rsvList">{{ i.prodNm }} : {{ i.ordStatCd }}</p>
          </td>
        </tr>
        <tr>
          <td v-for="o in calendar.dateArray[3]" v-bind:class="{off : o.rsvList.length == 0}">
            {{ o.day }}
            <p v-for="i in o.rsvList">{{ i.prodNm }} : {{ i.ordStatCd }}</p>
          </td>
        </tr>
        <tr>
          <td v-for="o in calendar.dateArray[4]" v-bind:class="{off : o.rsvList.length == 0}">
            {{ o.day }}
            <p v-for="i in o.rsvList">{{ i.prodNm }} : {{ i.ordStatCd }}</p>
          </td>
        </tr>
        <tr>
          <td v-for="o in calendar.dateArray[5]" v-bind:class="{off : o.rsvList.length == 0}">
            {{ o.day }}
            <p v-for="i in o.rsvList">{{ i.prodNm }} : {{ i.ordStatCd }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import dateUtil from '../../utils/util.date';
import MainService from '../../service/auth/MainService';

//rvCalendar
const calendar = reactive({
  year: '2023',
  month: '04',
  date: new Date(),
  dateFullYear: new Date().getFullYear(),
  dateMonth: new Date().getMonth(),
  dateArray: [
    [{
      day: '',
      date: '',
      rsvList: [
        { dd: '', prodNo: 0, prodNm: null, ordStatCd: null, hldNm: null, price: 0 }
      ],
    }],
  ],
});

const click = function () {

}

const getFirstDay = function () {
  return new Date(calendar.dateFullYear, calendar.dateMonth).getDay();
}

const getLastDay = function () {
  return new Date(calendar.dateFullYear, calendar.dateMonth + 1, 0).getDate();
}

const getFormat = function (date: Date, format: string) {
  return dateUtil.format(date, format);
}

onMounted(() => {

  MainService.getCalendar({ year: '2023', month: '04' }).then(
    (res) => {
      console.log(res.data);

      let fd = getFirstDay();
      calendar.dateArray = [];
      let array = [];
      for (let i = 1; i < 43; i++) {
        let date = new Date(calendar.dateFullYear, calendar.dateMonth).setDate(i - fd);
        let YYYYMMDD = dateUtil.format(date, 'YYYY-MM-DD');
        let rsvList = [];
        let idx = 0;
        for (let o of res.data) {
          if(idx > 2) {
            break;
          }
          if (o.dd == YYYYMMDD) {
            rsvList.push(o);
            idx++;
          }
        }
        array.push({
          day: dateUtil.format(date, 'D'),
          date: YYYYMMDD,
          rsvList: rsvList,
        });
        if (i % 7 == 0) {
          calendar.dateArray.push(array);
          array = [];
        }
      }

    },
    (err) => {
      console.log(err);
    },
  );
});

</script>

<style scoped>
#calendar {width: 100%;}
table.calendar {width: 100%;}
table.calendar th {width: 14%;text-align: center;}
table.calendar td {text-align:left; vertical-align:top; height:110px; white-space:nowrap;}
table.calendar td.off {color:#ccc; background:#f2f2f2;}
</style>
