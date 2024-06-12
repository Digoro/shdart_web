#!/bin/bash

prodEnv=`cat src/environments/environment.ts`

if [[ $prodEnv != *"localhost"* && $prodEnv != *"development"* ]]; then
    npm run build:prod &&
    zip -r dist.zip dist/ &&
    scp -i ~/.ssh/shdart.pem dist.zip ubuntu@ec2-15-165-158-243.ap-northeast-2.compute.amazonaws.com:/home/ubuntu
else
    echo "[빌드 실패] environment.ts 파일에 localhost 또는 development 문자열이 발견되었습니다."
fi

rm -rf ./dist.zip