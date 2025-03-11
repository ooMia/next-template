import React, { ComponentType, FC, useEffect } from "react";

// 로그 상태 타입 정의
type LogState = "render" | "mount" | "unmount";

// 상태별 스타일을 함수 외부로 분리하여 재사용 및 성능 개선
const STATE_STYLES: Record<LogState, string> = {
  render: "color: #60a5fa; font-weight: bold;",
  mount: "color: #34d399; font-weight: bold;",
  unmount: "color: #fb923c; font-weight: bold;",
};

/**
 * 컴포넌트에 로깅 기능을 추가하는 래퍼 함수
 * @param Component 로깅할 원본 컴포넌트
 * @param explicitName 명시적 컴포넌트 이름 (프로덕션 환경용)
 * @returns 로깅 기능이 추가된 새 컴포넌트
 */
export function asLoggableComponent<P extends object>(
  Component: ComponentType<P>,
  explicitName?: string,
): FC<P> {
  const name =
    explicitName ||
    Component.displayName ||
    Component.name ||
    "UnknownComponent";

  const LoggableComponent: FC<P> = (props) => {
    useLogFunctionName(name);
    return React.createElement(Component, props);
  };

  return LoggableComponent;
}

/**
 * 함수 컴포넌트의 렌더링, 마운트, 언마운트 시점을 로깅하는 훅
 * @param functionName 함수 컴포넌트의 이름
 */
const useLogFunctionName = (functionName: string, props?: object): void => {
  function log(state: LogState) {
    const stateStyle = STATE_STYLES[state];
    const paddedState = state.padEnd(8, " ");

    console.info(
      `%c${paddedState} %cLog(%c${functionName}%c)`,
      stateStyle, // 상태별 다른 색상
      "color: #64748b; font-weight: normal;", // Log( 부분은 흐리게
      "color: #7dd3fc; font-weight: bold;", // 컴포넌트 이름은 밝은 하늘색으로 강조
      "color: #64748b; font-weight: normal;", // ) 부분도 흐리게
      props ? props : "",
    );
  }

  log("render");
  useEffect(() => {
    log("mount");
    return () => {
      log("unmount");
    };
  });
};

export default useLogFunctionName;
