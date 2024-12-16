## PlantUML ábra az órai példa alapján

```Plantuml
@startuml
interface Observee<MessageType>{
   +default void subscribe(Observer o) { observers.add(o); }
   +default void unsubscribe(Observer o) { observers.remove(o); }
   +notify() { for(Observer o : observers) o.receiveRef(...); }
}
interface Observer<MessageType>{
   +abstract void receiveRef(MessageType msg);
   +abstract void onError(String errorMsg);
   +abstact void end();
}

Observee "0..1" o-right-> "0..n" Observer : -observers

Visszaszámláló .up.|> Observee
FelhasználóiFelület .up.|> Observer
Main ..> Visszaszámláló : 1:<<create>>számláló;3:<<subscribe>>felület
Main ..> FelhasználóiFelület: 2:<<create>>felület;
@enduml
```

### PlantUML Oberser Observee ábra:
![PlantUML Oberser Observee](/documentation/otherFigures/PlantUml.png "PlantUML")

### [Back to README](/README.md)