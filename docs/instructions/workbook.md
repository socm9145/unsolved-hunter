# <img src="../../app/icons/256.png" width="28" height="28"> 문제집 문제 선별

### 1. 헌터 등록하기

- BOJ 그룹 랭킹 탭에서 오른쪽 '헌터 등록' 버튼을 누릅니다.
- 헌터 초기화로 헌터를 등록하지 않고 문제를 선별할 수도 있습니다.

![ranklist](../images/ranklist.png)

### 2. 등록 확인 및 문제 사냥하기

- 오른쪽 끝에서 등록 헌터의 수를 확인할 수 있습니다.

![workbook](../images/workbook.png)

- 티어를 선택하고, 문제 개수를 입력 후 사냥하기를 누르면 문제가 자동으로 등록됩니다.

![workbook_hunted](../images/workbook_hunted.png)

### 제작 의도

- 백준 그룹으로 알고리즘 스터디를 진행할 때, 모든 구성원이 안 푼 문제를 선별하기 위한 반복적인 검색 작업을 해결하기 위해 제작했습니다. 또한, 선별할 문제를 고민하는 시간을 줄여줍니다.
- 많은 사람이 풀어 이미 검증된 문제를 선별하는 게 알고리즘 공부하는 데 도움이 될 것으로 판단해서 푼 사람 수가 많은 문제 먼저 고르도록 구현했습니다.

### 제약 사항

- solved.ac 검색 api를 기반으로 첫 번째 페이지에서 문제를 가져오기 때문에 한 번에 최대 50개로 제한됩니다.
- 검색 쿼리의 길이 제한이 있어 헌터 수가 약 40명 이상일 때부터, 검색할 수 없는 경우가 존재합니다.

### 참고 사항

- 문제 선별 기준은 다음과 같습니다.

1.  해당 티어
2.  모든 헌터가 안 푼 문제
3.  푼 사람 수가 많은 순
4.  상위 50개 중 입력 개수만큼 무작위로 선별

- 4번 항목 때문에 상위 50개의 문제를 풀지 않으면 항상 같은 문제가 선별됩니다.
- 이를 방지하기 위해 문제를 선별하는 범위를 늘릴 계획이 있습니다.