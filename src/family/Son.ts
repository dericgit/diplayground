import { Injectable, Inject, LazyInject } from "../di";
import { Father } from "./Father";
import { IPerson, IFather } from "./PersionTyping";

@Injectable()
export class Son {
  @Inject(Father)
  father!: Father;

  name = "Thrall";

  getDescription() {
    return `I am ${this.name}, son of ${this.father.name}.`;
  }
}

@Injectable()
export class SonWithLazy extends Son {
  @LazyInject(() => Father)
  father!: Father;
}

@Injectable()
export class SonWithAbstraction {
  @Inject(IFather)
  father!: IPerson;

  name = "Thrall";

  getDescription() {
    return `I am ${this.name}, son of ${this.father.name}.`;
  }
}
