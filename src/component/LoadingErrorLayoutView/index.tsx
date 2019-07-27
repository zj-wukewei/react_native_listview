import * as React from "react";
import { DataState } from "../../reducers/handleDataReducer";
import LoadingView from "../LoadingView";
import ErrorView from "../ErrorView";

interface LayoutViewProps {
  dataSocure: DataState<any>;
  onPress: () => void;
}

class LoadingErrorLayoutView extends React.PureComponent<LayoutViewProps> {
  render() {
    const { dataSocure, onPress } = this.props;
    if (dataSocure.loading) {
      return <LoadingView />;
    }
    if (dataSocure.error) {
      return <ErrorView onPress={onPress} />;
    }

    return this.props.children(dataSocure.data);
  }
}

export default LoadingErrorLayoutView;
