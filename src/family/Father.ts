import { Injectable, Inject, LazyInject } from "../di";
import { Son } from "./Son";
import { IPerson, ISon } from "./PersionTyping";

@Injectable()
export class Father {
  @Inject(Son)
  son!: Son;

  name = "Durotan";

  getDescription() {
    return `I am ${this.name}, my son is ${this.son.name}.`;
  }
}

@Injectable()
export class FatherWithLazy extends Father {
  @LazyInject(() => Son)
  son!: Son;
}

@Injectable()
export class FatherWithAbstraction {
  @Inject(ISon)
  son!: IPerson;

  name = "Durotan";

  getDescription() {
    return `I am ${this.name}, my son is ${this.son.name}.`;
  }
}
