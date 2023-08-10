import "reflect-metadata";
import { ContainerV1, ContainerV2, ContainerV3 } from "./di";
import {
  Student,
  StudentWithAbstraction,
  StudentWithLazyInstance
} from "./students";
import {
  Bicycle,
  Car,
  Transportation,
  ITransportation
} from "./transportations";
import {
  Father,
  FatherWithAbstraction,
  FatherWithLazy,
  IFather,
  ISon,
  Son,
  SonWithAbstraction,
  SonWithLazy
} from "./family";

const studentResutDiv = document.getElementById("student_result")!;
const studentBtn = document.getElementById("student_btn")!;
const weekdayStatusSpan = document.getElementById("weekday_status")!;
const weekdaySelect = document.getElementById(
  "weekday_select"
) as HTMLSelectElement;
const versionSelect = document.getElementById(
  "version_select"
) as HTMLSelectElement;
const handlerMap = new Map();

const WEEKDAY_MAP = new Map([
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [6, "Saturday"],
  [7, "Sunday"]
]);

weekdaySelect.addEventListener("change", () => {
  const weekday = Number(weekdaySelect.value);
  weekdayStatusSpan.innerHTML = `On ${WEEKDAY_MAP.get(weekday)}:`;
  studentResutDiv.innerHTML = "";
});

studentBtn.addEventListener("click", () => {
  const weekday = Number(weekdaySelect.value);
  const version = versionSelect.value;
  const fn = handlerMap.get(version);
  const ret = fn?.(weekday);
  studentResutDiv.innerHTML = ret;
});

handlerMap.set("ByHandle", (weekday: number) => {
  const transportation = weekday > 5 ? new Car() : new Bicycle();
  const student = new Student(transportation);
  return student.gotoSchool();
});

handlerMap.set("ContainerV1", (weekday: number) => {
  const container = new ContainerV1();
  const student = container.resolve(Student);
  return student.gotoSchool();
});

handlerMap.set("ContainerV2", (weekday: number) => {
  const container = new ContainerV2();
  container.register({
    token: Transportation,
    useClass: Bicycle
  });
  const student = container.resolve(Student);
  return student.gotoSchool();
});

handlerMap.set("ContainerV2_Factory", (weekday: number) => {
  const container = new ContainerV2();
  container.register({
    token: Transportation,
    useFactory: (c) => {
      if (weekday > 5) {
        return c.resolve(Car);
      } else {
        return c.resolve(Bicycle);
      }
    }
  });
  const student = container.resolve(Student);
  return student.gotoSchool();
});

handlerMap.set("ContainerV2_Abstract", (weekday: number) => {
  const container = new ContainerV2();
  container.register({
    token: ITransportation,
    useFactory: (c) => {
      if (weekday > 5) {
        return c.resolve(Car);
      } else {
        return c.resolve(Bicycle);
      }
    }
  });
  const student = container.resolve(StudentWithAbstraction);
  return student.gotoSchool();
});

handlerMap.set("ContainerV2_Lazy", (weekday: number) => {
  const container = new ContainerV2();
  container.register({
    token: ITransportation,
    useFactory: (c) => {
      if (weekday > 5) {
        return c.resolve(Car);
      } else {
        return c.resolve(Bicycle);
      }
    }
  });
  const student = container.resolve(StudentWithLazyInstance);
  console.log("Log before gotoSchool");
  return student.gotoSchool();
});

handlerMap.set("Family_Error", () => {
  const container = new ContainerV2();
  const father = container.resolve(Father);
  const son = container.resolve(Son);
  return ["", son.getDescription(), father.getDescription()].join("\n");
});

handlerMap.set("Family_Abstract", () => {
  const container = new ContainerV2(
    { token: IFather, useClass: FatherWithAbstraction },
    { token: ISon, useClass: SonWithAbstraction }
  );
  const father = container.resolve(FatherWithAbstraction);
  const son = container.resolve(SonWithAbstraction);
  return ["", son.getDescription(), father.getDescription()].join("</br>");
});

handlerMap.set("Family_Lazy", () => {
  const container = new ContainerV3();
  const father = container.resolve(FatherWithLazy);
  const son = container.resolve(SonWithLazy);
  return ["", son.getDescription(), father.getDescription()].join("</br>");
});
