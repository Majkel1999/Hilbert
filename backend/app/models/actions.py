from enum import Enum

class Action(Enum):
    FileAdded = 1
    FileDeleted = 2
    ModelTraining = 3
    ProjectDeleted = 4