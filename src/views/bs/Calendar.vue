<template>
  <div id="calendar">
    <h1>calendar</h1>

    <table>
      <thead>
        <th colspan="7">
          <p><span> year </span>년 <span> month </span>월</p>
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
        <tr><td v-for="o in calendar.dateArray[0]">{{ o.day }}</td></tr>
        <tr><td v-for="o in calendar.dateArray[1]">{{ o.day }}</td></tr>
        <tr><td v-for="o in calendar.dateArray[2]">{{ o.day }}</td></tr>
        <tr><td v-for="o in calendar.dateArray[3]">{{ o.day }}</td></tr>
        <tr><td v-for="o in calendar.dateArray[4]">{{ o.day }}</td></tr>
        <tr><td v-for="o in calendar.dateArray[5]">{{ o.day }}</td></tr>
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
  date: new Date(),
  dateFullYear: new Date().getFullYear(),
  dateMonth: new Date().getMonth(),
  dateArray: [
    [{day: ''}],
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

const getFormat = function (date:Date, format:string) {
  return dateUtil.format(date, format);
}

onMounted(() => {

  MainService.getCalendar({ year : '2023' , month: '04'}).then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    },
  );
  
  let fd = getFirstDay();
  calendar.dateArray = [];
  let array = [];
  for(let i = 1; i < 43; i++) {

    let date = new Date(calendar.dateFullYear, calendar.dateMonth).setDate(i - fd);

    array.push({ 
      day: dateUtil.format(date,'D'),
      date: dateUtil.format(date,'YYYY-MM-DD'),
    });

    if(i % 7 == 0) {
      calendar.dateArray.push(array);
      array = [];
    }
  }
});

</script>

<style scoped></style>
